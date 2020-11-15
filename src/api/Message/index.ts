import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateMessageArgs, UpdateMessageArgs } from "@args/Message";
import { Block } from "@entity/Block";
import { Button } from "@entity/Button";
import { File } from "@entity/File";
import { Message } from "@entity/Message";

@Resolver(() => Message)
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
      userId,
      plainText,
      actions,
      blocks,
      files,
      submit,
    }: CreateMessageArgs
  ): Promise<boolean> {
    try {
      const actionList = actions ? await Button.find({ where: actions}) : null;
      const blockList = blocks ? await Block.find({ where: blocks}) : null;
      const fileList = files ? await File.find({ where: files}) : null;
      await Message.create({
        chatId,
        userId,
        plainText,
        actions: actionList,
        blocks: blockList,
        files: fileList,
        submit,
      }).save();
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateMessage(
    @Args() { id, plainText, actions, blocks, files, submit }: UpdateMessageArgs
  ): Promise<boolean> {
    try {
      const actionList = actions ? await Button.find({ where: actions}) : [];
      const blockList = blocks ? await Block.find({ where: blocks}) : [];
      const fileList = files ? await File.find({ where: files}) : [];
      const message = await Message.findOne(
        { id },
        { relations: ["actions", "blocks", "files", "submit"] }
      );
      const connection = getConnection()
        .getRepository(Message);
      const query = connection
        .createQueryBuilder();
      query
        .relation(Message, "actions")
        .of(message)
        .addAndRemove(actionList, message.actions || []);
      query
        .relation(Message, "blocks")
        .of(message)
        .addAndRemove(blockList, message.blocks || []);
      query
        .relation(Message, "files")
        .of(message)
        .addAndRemove(fileList, message.files || []);
      if(plainText) message.plainText = plainText;
      if(submit) message.submit = submit;
      connection.save(message);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteMessage(@Arg("id") id: string): Promise<boolean> {
    try {
      await Message.delete({ id });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
