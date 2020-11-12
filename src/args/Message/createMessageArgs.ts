import { Block } from "@entity/Block";
import { File } from "@entity/File";
import { ArgsType, Field } from "type-graphql";
import { Button } from '../../entity/Button/index';
import { Submit } from '../../entity/Submit/index';

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