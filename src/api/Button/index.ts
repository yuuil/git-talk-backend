import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Button } from "../../entity/Button/index";

@Resolver()
export class ButtonResolver {
  @Query(() => Button, { nullable: true })
  async button(@Arg("key") key: string): Promise<Button> {
    try {
      return await Button.findOne({ key });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async createButton(
    @Arg("text") text: string,
    @Arg("theme", { nullable: true }) theme?: string,
    @Arg("url", { nullable: true }) url?: string
  ): Promise<boolean> {
    try {
      await Button.insert({
        text,
        theme,
        url,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async modifyButton(
    @Arg("id") id: string,
    @Arg("text", { nullable: true }) text?: string,
    @Arg("theme", { nullable: true }) theme?: string,
    @Arg("url", { nullable: true }) url?: string
  ): Promise<Boolean> {
    try {
      await Button.update({ id }, { text, theme, url });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteButton(@Arg("id") id: string): Promise<Boolean> {
    try {
      await Button.delete({ id });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}