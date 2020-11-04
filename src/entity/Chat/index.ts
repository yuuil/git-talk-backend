import { Message } from "@entity/Message";
import { Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column("text")
  state: string;

  @Field()
  @Column("text")
  stateKey: string;

  @Field()
  @Column("json")
  lastMessage: Message;

  @Field()
  @Column("timestamp with local time zone", {nullable: true})
  askedAt?: Date;

  @Field()
  @Column("timestamp with local time zone", {nullable: true})
  closedAt?: Date;

  @Field()
  @CreateDateColumn({type: "timestamp with local time zone"})
  createdAt: Date;
}