import { ArgsType, Field, Int } from "type-graphql";
import { File } from "@entity/File";

@ArgsType()
export class CreateFileArgs implements Partial<File> {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field(() => Int)
  size: number;

  @Field(() => Boolean)
  animated: boolean;

  @Field()
  contentType: string;

  @Field(() => Int, { nullable: true })
  width?: number;

  @Field(() => Int, { nullable: true })
  height?: number;
}