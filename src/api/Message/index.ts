import { Arg, Query, Resolver } from "type-graphql";
import { Message } from "@entity/Message/index";

@Resolver()
export class MessageResolver {
  @Query(() => Message, { nullable: true })
  async message(@Arg("id") id: string): Promise<Message> {
    try {
      return await Message.findOne({ id }, { relations: ["actions", "blocks", "files", "submit"] });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}
