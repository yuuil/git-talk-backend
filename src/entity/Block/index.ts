import { Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Block extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  
  @Field()
  @Column("text")
  blockId: string;

  @Field()
  @Column("text")
  type: string;

  @Field()
  @Column("text")
  value: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}