import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Submit } from "@entity/Submit";

@Resolver()
export class SubmitResolver {
  @Query(() => Submit, { nullable: true })
  async submit(@Arg("id") id: string): Promise<Submit> {
    try {
      return await Submit.findOne({ id });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async createSubmit(
    @Arg("messageId") messageId: string,
    @Arg("key") key: string
  ): Promise<boolean> {
    try {
      await Submit.insert({ messageId, key });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteSubmit(@Arg("id") id: string): Promise<boolean> {
    try {
      await Submit.delete({ id });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
