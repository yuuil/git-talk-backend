import { Field, InputType } from "type-graphql";

@InputType()
export class BaseInputType {
  @Field({nullable: true})
  id?: string;

  @Field({nullable: true})
  key?: string;
}