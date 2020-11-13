import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CryptoJS from "crypto-js";
import { User } from "@entity/User";
import { generateToken } from '@src/utils';

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
      const hashed: string = CryptoJS.HmacSHA512(password, process.env.PW_SECRET_KEY).toString(CryptoJS.enc.Base64);
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
  async logIn(@Arg("userId") userId: string, @Arg("password") password: string): Promise<string> {
    try {
      const user = await User.findOne({userId});
      if(user) {
        const hashed = CryptoJS.HmacSHA512(password, process.env.PW_SECRET_KEY).toString(CryptoJS.enc.Base64);
        if(hashed === user.password) return generateToken(user.id);
        else throw Error("잘못된 아이디/비밀번호입니다.");
      } else throw Error("존재하지 않는 사용자입니다.");
    } catch (err) {
      console.warn(err);
      throw Error("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }
}
