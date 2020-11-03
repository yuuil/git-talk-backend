import { Field, ID, ObjectType } from "type-graphql";
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @CreateDateColumn({type:'datetime'})
  createdAt: Date;
}