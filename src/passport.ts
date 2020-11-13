import { User } from "@entity/User";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const verifyUser = async (payload, done) => {
  try {
    console.log(payload);
    const user = await User.findOne({ id: payload.id });
    if (user) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
