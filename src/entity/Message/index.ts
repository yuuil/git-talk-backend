import { Action } from "@entity/Action";
import { Block } from "@entity/Block";
import { Button } from "@entity/Button";
import { File } from "@entity/File";
import { Submit } from "@entity/Submit";
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
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column("text")
  chatId: string;

  @Field()
  @Column("text")
  chatKey: string;

  @Field()
  @Column("text")
  userId: string;

  @Field()
  @Column("text")
  plainText: string;

  @Field()
  @Column("json")
  actions: Action[];

  @Field()
  @Column("json")
  blocks: Block[];

  @Field()
  @Column("json")
  buttons: Button[];

  @Field()
  @Column("json")
  files: File[];

  @Field()
  @Column("json")
  submit: Submit;

  @Field()
  @CreateDateColumn({ type: "timestamp with local time zone" })
  createdAt: Date;
}
