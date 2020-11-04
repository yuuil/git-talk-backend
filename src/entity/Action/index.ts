import { Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Generated, PrimaryGeneratedColumn } from "typeorm";

export class Action extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column("text")
  key: string;

  @Field()
  @Column("text")
  text: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}