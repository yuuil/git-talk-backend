import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import CryptoJS from "crypto-js";
import { User } from "@entity/User";
import { Context } from "graphql-yoga/dist/types";
import { generateToken } from "../../utils";

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
      const hashed: string = CryptoJS.HmacSHA512(
        password,
        process.env.PW_SECRET_KEY
      ).toString(CryptoJS.enc.Base64);
      await User.insert({
        userId,
        password: hashed,
        name,
        avatarUrl,
      });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Arg("userId") userId: string): Promise<boolean> {
    try {
      await User.delete({ userId });
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  @Mutation(() => String)
  async logIn(
    @Arg("userId") userId: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    try {
      const { user } = await ctx.authenticate("graphql-local", {
        username: userId,
        password,
      });
      ctx.login(user);
      return generateToken(user.id);
    } catch (err) {
      console.warn(err);
      throw Error("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }
}
