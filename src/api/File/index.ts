import { File } from "@entity/File";
import { Arg, Query, Resolver } from "type-graphql";

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
}
