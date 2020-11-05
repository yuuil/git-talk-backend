import { Chat } from "@entity/Chat";
import { User } from "@entity/User/index";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ChatResolver {
  @Query(() => Chat, { nullable: true })
  async chat(@Arg("id") id: string): Promise<Chat> {
    try {
      return await Chat.findOne({ id });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Query(() => [Chat], { nullable: true })
  async chats() {
    return await Chat.find();
  }

  @Mutation(() => Boolean)
  async createChat(@Arg("personId") personId: string): Promise<boolean> {
    const user: User = await User.create({
      id: personId,
    });
    try {
      await Chat.insert({
        user,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
