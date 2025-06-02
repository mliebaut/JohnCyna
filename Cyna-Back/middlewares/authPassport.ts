import * as PassFunc from '../functions/password';
import {PrismaClient} from '@prisma/client'
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const prisma = new PrismaClient()

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser(async (email, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = async function ensureAuthenticated(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = { error: 'Authentication required' };
  }
};

passport.use(new LocalStrategy({
    email: 'email',
    password: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        select: {
          lastName: true,
          firstName: true,
          email: true,
          password: true,
          emailConfirmed: true,
        },
        where: { email }
      });

      if (!user) {
        console.log("not found");
        return done(null, false, { message: 'User not found' });
      }
      if (!user.emailConfirmed) {
        console.log("not verified");
        return done(null, false, { message: 'Email not verified' });

      }
      const isValid = await PassFunc.checkMyPassword(password, user.password);
      if (!isValid) {
        console.log("failed");
        return done(null, false, { message: 'Authentication failed' });
      }
      console.log("done");
      return done(null, user);
    } catch (err) {
      console.log("done");
      return done(err);
    }
  }
));