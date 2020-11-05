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
export class Button extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text", { nullable: true })
  theme?: string;

  @Field()
  @Column("text")
  url: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
