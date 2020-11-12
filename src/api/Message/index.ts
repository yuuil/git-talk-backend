import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "@entity/Message/index";
import { CreateMessageArgs } from '@args/Message';

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

  @Mutation(() => Boolean)
  async createMessage(
    @Args()
    {
      chatId,
      chatKey,
      userId,
      plainText,
      actions,
      blocks,
      files,
      submit,
    }: CreateMessageArgs
  ): Promise<boolean> {
    try {
      await Message.insert({
        chatId,
        chatKey,
        userId,
        plainText,
        actions,
        blocks,
        files,
        submit,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
