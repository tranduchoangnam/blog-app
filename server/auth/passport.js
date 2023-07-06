import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const domain = process.env.BACKEND_URL;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${domain}/auth/google/callback`,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // check if user existed
      if (profile.id) {
        const existingUser = await prisma.user.findUnique({
          where: {
            userId: profile.id,
          },
        });

        //if existed, update user
        if (existingUser) {
          let updatedUser = await prisma.user.update({
            where: {
              userId: profile.id,
            },
            data: {
              email: profile.emails[0].value,
              name: profile.name.familyName + " " + profile.name.givenName,
              photo: profile.photos[0].value,
            },
          });
          return done(null, updatedUser);
        }

        //if not, create user
        let newUser = await prisma.user.create({
          data: {
            userId: profile.id,
            email: profile.emails[0].value,
            name: profile.name.familyName + " " + profile.name.givenName,
            photo: profile.photos[0].value,
          },
        });
        return done(null, newUser);
      }
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${domain}/auth/facebook/callback`,
      passReqToCallback: true,
      profileFields: ["id", "displayName", "photos", "email"],
    },

    async (req, accessToken, refreshToken, profile, done) => {
      // check if user existed
      if (profile.id) {
        const existingUser = await prisma.user.findUnique({
          where: {
            userId: profile.id,
          },
        });

        //if existed, update user
        if (existingUser) {
          let updatedUser = await prisma.user.update({
            where: {
              userId: profile.id,
            },
            data: {
              email: profile.emails[0].value,
              name: profile.displayName,
              photo: profile.photos[0].value,
            },
          });
          return done(null, updatedUser);
        }

        //if not, create user
        let newUser = await prisma.user.create({
          data: {
            userId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            photo: profile.photos[0].value,
          },
        });
        return done(null, newUser);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  let user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });
  done(null, user);
});
