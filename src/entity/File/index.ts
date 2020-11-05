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
export class File extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column("text")
  type: string;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column("int")
  size: number;

  @Field()
  @Column("boolean")
  animated: boolean;

  @Field()
  @Column("text")
  contentType: string;

  @Field()
  @Column("int", { nullable: true })
  width?: number;

  @Field()
  @Column("int", { nullable: true })
  height?: number;

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}
