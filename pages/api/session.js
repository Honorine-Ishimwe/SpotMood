import { ironSession } from "iron-session/next";

export const sessionOptions = {
  password: "very_strong_password_that_is_32+_characters",
  cookieName: "spotMood_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSession(handler) {
  return ironSession(handler, sessionOptions);
}