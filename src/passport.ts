import { User } from "@entity/User";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { generateToken } from './utils';

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const verifyUser = async (payload, done) => {
  try {
    const user = await User.findOne({ id: payload.id });
    if (user) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

const verifyLocal = async (userId, password, done) => {
  const user = await User.findOne({ userId });
  if (user) {
    const hashed = CryptoJS.HmacSHA512(
      password,
      process.env.PW_SECRET_KEY
    ).toString(CryptoJS.enc.Base64);
    if (hashed === user.password) return done(null, user);
    else return done(null, false, { message: "잘못된 아이디/비밀번호입니다." });
  } else return done(null, false, { message: "존재하지 않는 사용자입니다." });
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next);


passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
