import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "@entity/Message/index";
import { Button } from "@entity/Button";
import { Block } from "@entity/Block";
import { File } from "@entity/File";
import { Submit } from "@entity/Submit";

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
    @Arg("chatId") chatId: string,
    @Arg("chatKey") chatKey: string,
    @Arg("userId") userId: string,
    @Arg("plainText") plainText: string,
    @Arg("actions", { nullable: true }) actions: Button[],
    @Arg("blocks", { nullable: true }) blocks: Block[],
    @Arg("files", { nullable: true }) files: File[],
    @Arg("submit", { nullable: true }) submit: Submit
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
