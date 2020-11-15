import { Block } from '@entity/Block'
import { Button } from '@entity/Button'
import { File } from '@entity/File'
import { Submit } from '@entity/Submit'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
  userId: string;

  @Field()
  @Column("text")
  plainText: string;

  @Field(() => [Button], { nullable: true })
  @ManyToMany(() => Button, { cascade: ["insert", "update"] })
  @JoinTable()
  actions: Button[];

  @Field(() => [Block], { nullable: true })
  @ManyToMany(() => Block, { cascade: ["insert", "update"] })
  @JoinTable({
    joinColumns: [{ referencedColumnName: "id" }],
    inverseJoinColumns: [{ referencedColumnName: "key" }],
  })
  blocks: Block[];

  @Field(() => [File], { nullable: true })
  @ManyToMany(() => File, { cascade: ["insert", "update"] })
  @JoinTable()
  files: File[];

  @Field(() => Submit, { nullable: true })
  @OneToOne(() => Submit, (submit) => submit.id, { cascade: ["insert", "update"] })
  @JoinColumn()
  submit: Submit;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
