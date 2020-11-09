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
  JoinTable,
  ManyToMany,
  OneToOne,
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

  @Field(() => [Button])
  @ManyToMany(() => Button)
  @JoinTable()
  actions: Button[];

  @Field(() => [Block])
  @ManyToMany(() => Block)
  @JoinTable()
  blocks: Block[];

  @Field(() => [File])
  @ManyToMany(() => File)
  @JoinTable()
  files: File[];

  @Field()
  @OneToOne(() => Submit, submit => submit.id)
  submit: Submit;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
