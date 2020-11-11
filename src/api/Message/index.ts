import { Arg, Query, Resolver } from "type-graphql";
import { Message } from "@entity/Message/index";

@Resolver()
export class MessageResolver {
  @Query(() => Message, { nullable: true })
  async message(@Arg("id") id: string): Promise<Message> {
    try {
      return await Message.findOne(
        { id },
        { relations: ["actions", "blocks", "files", "submit"] }
      );
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Query(() => [Message], { nullable: true })
  async messages(
    @Arg("userId") userId: string,
    @Arg("page", { defaultValue: 0 }) page?: number,
    @Arg("per", { defaultValue: 20 }) per?: number
  ): Promise<Message[]> {
    try {
      return await Message.find({
        where: { userId },
        relations: ["actions", "blocks", "files", "submit"],
        skip: page * per,
        take: per,
        order: { createdAt: "DESC" },
      });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}
