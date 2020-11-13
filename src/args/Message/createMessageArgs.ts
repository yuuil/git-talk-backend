import { Block } from "@entity/Block";
import { Button } from '@entity/Button';
import { File } from "@entity/File";
import { Submit } from '@entity/Submit';
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateMessageArgs {
  @Field()
  chatId: string;

  @Field()
  chatKey: string;

  @Field()
  userId: string;

  @Field()
  plainText: string;

  @Field(() => [Button], {nullable: true})
  actions?: Button[];

  @Field(() => [Block], {nullable: true})
  blocks?: Block[];

  @Field(() => [File], {nullable: true})
  files?: File[];

  @Field(() => Submit, {nullable: true})
  submit?: Submit;
}