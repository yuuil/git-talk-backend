import { File } from "@entity/File";
import { Arg, Query, Resolver, Mutation, Args } from "type-graphql";
import { CreateFileArgs } from "@args/File";

@Resolver()
export class FileResolver {
  @Query(() => File, { nullable: true })
  async file(@Arg("id") id: string): Promise<File> {
    try {
      return await File.findOne({ id });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async createFile(
    @Args()
    { type, name, size, animated, contentType, width, height }: CreateFileArgs
  ): Promise<boolean> {
    try {
      await File.insert({
        type,
        name,
        size,
        animated,
        contentType,
        width,
        height,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteFile(@Arg("id") id: string): Promise<boolean> {
    try {
      await File.delete({id});
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
