import { Chat } from "@entity/Chat";
import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column("text")
  userId: string;

  @Field()
  @Column("text")
  password: string;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column("text", { nullable: true })
  avatarUrl?: string;

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, (chat) => chat.user, {lazy: true})
  async userChats(@Root() user: User): Promise<Chat[]> {
    return await Chat.find(user);
  };

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
