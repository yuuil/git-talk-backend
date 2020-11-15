import { Block } from "@entity/Block";
import { Button } from '@entity/Button';
import { File } from "@entity/File";
import { Submit } from '@entity/Submit';
import { Message } from "@entity/Message";
import { ArgsType, Field } from "type-graphql";
import { BaseInputType } from '../index';

@ArgsType()
export class CreateMessageArgs implements Partial<Message> {
  @Field()
  chatId: string;

  @Field()
  userId: string;

  @Field()
  plainText: string;

  @Field(() => [BaseInputType], {nullable: true})
  actions?: Button[];

  @Field(() => [BaseInputType], {nullable: true})
  blocks?: Block[];

  @Field(() => [BaseInputType], {nullable: true})
  files?: File[];

  @Field(() => String, {nullable: true})
  submit?: Submit;
}