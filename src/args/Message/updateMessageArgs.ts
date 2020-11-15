import { ArgsType, Field } from "type-graphql";
import { File } from '@entity/File';
import { Message } from '@entity/Message';
import { Block } from "@entity/Block";
import { Button } from "@entity/Button";
import { Submit } from "@entity/Submit";
import { BaseInputType } from "..";

@ArgsType()
export class UpdateMessageArgs implements Partial<Message> {
  @Field()
  id: string;

  @Field({nullable: true})
  plainText?: string;

  @Field(() => [BaseInputType], {nullable: true})
  actions?: Button[];

  @Field(() => [BaseInputType], {nullable: true})
  blocks?: Block[];

  @Field(() => [BaseInputType], {nullable: true})
  files?: File[];

  @Field(() => String, {nullable: true})
  submit?: Submit;
}