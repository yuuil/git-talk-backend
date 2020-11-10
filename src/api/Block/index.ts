import { Block } from "@entity/Block";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class BlockResolver {
  @Query(() => Block, { nullable: true })
  async block(@Arg("key") key: string): Promise<Block> {
    try {
      return await Block.findOne({ key });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async createBlock(
    @Arg("type") type: string,
    @Arg("value") value: string
  ): Promise<Boolean> {
    try {
      Block.insert({
        type,
        value,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async modifyBlock(
    @Arg("id") id: string,
    @Arg("type", { nullable: true }) type?: string,
    @Arg("value", { nullable: true }) value?: string
  ): Promise<Boolean> {
    try {
      await Block.update({ id }, { type, value });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteBlock(@Arg("id") id: string): Promise<Boolean> {
    try {
      await Block.delete({id});
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
