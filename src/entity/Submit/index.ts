import { Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Submit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  key: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}
