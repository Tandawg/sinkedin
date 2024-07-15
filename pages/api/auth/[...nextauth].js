import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { TypeORMAdapter } from "@auth/typeorm-adapter";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: TypeORMAdapter({
    type: "mongodb",
    url: process.env.MONGODB_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [],
  }),
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/home",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
};

export default NextAuth(authOptions);
