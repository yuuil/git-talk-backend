import { Chat } from "@entity/Chat";
import { User } from "@entity/User";
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

  @Mutation(() => String)
  async createChat(@Arg("personId") personId: string): Promise<string> {
    const user: User = await User.findOne({ userId: personId });
    try {
      return await Chat.insert({
        user,
      }).then((res) => res.identifiers[0].id);
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async closeChat(@Arg("id") id: string): Promise<boolean> {
    try {
      await Chat.update(
        { id },
        {
          state: "close",
        }
      );
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteChat(@Arg("id") id: string): Promise<boolean> {
    try {
      await Chat.delete({ id });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
