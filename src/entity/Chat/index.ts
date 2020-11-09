import { Message } from "@entity/Message";
import { User } from "@entity/User";
import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column("text", { default: "open" })
  state: string;

  @Field()
  @Column("text")
  stateKey(@Root() chat: Chat): string {
    return chat.state + chat.id;
  }

  @Field(() => Message)
  @OneToOne(() => Message, (message) => message.id, { lazy: true })
  async lastMessage(@Root() chat: Chat): Promise<Message> {
    return await Message.findOne(chat, { order: { createdAt: "DESC" } });
  }

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userChats, { lazy: true })
  async user(@Root() chat: Chat): Promise<User> {
    return await User.findOne(chat);
  }

  @Field()
  @Column("timestamp with time zone", { nullable: true })
  askedAt?: Date;

  @Field()
  @Column("timestamp with time zone", { nullable: true })
  closedAt?: Date;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
