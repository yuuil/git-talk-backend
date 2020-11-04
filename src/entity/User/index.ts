import { Chat } from "@entity/Chat";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
  @Column("text")
  avatarUrl: string;

  @Field()
  @Column("json")
  userChats: Chat[];

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}
