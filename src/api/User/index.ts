import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "@entity/User";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("userId") userId: string): Promise<User> {
    try {
      return await User.findOne({ userId });
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  @Query(() => [User], { nullable: true })
  async users() {
    return await User.find();
  }

  @Mutation(() => Boolean)
  async createAccount(
    @Arg("userId") userId: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("avatarUrl", { nullable: true }) avatarUrl?: string
  ): Promise<boolean> {
    try {
      await User.insert({
        userId,
        password,
        name,
        avatarUrl,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}
