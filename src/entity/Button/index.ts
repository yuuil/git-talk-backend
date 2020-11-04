import { Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Button extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text", {nullable: true})
  theme?: string;

  @Field()
  @Column("text")
  url: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}