import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["key"])
export class Block extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @PrimaryGeneratedColumn("increment")
  readonly key: string;

  @Field()
  @Column("text")
  type: string;

  @Field()
  @Column("text")
  value: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
