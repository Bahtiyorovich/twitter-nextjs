import {AuthOptions} from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from './mongoose';
import User from '@/database/user.model';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize({credentials}:any) {
        await connectToDatabase();

        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Incorrect email or password');
        }
        if (user.password !== password) {
          throw new Error('Incorrect username or password');
        }
        return user;
      },
    })
  ],
  callbacks: {
    async session({session}: any) {
      await connectToDatabase();

      const isExistingUser = await User.findOne({email: session.user.email});
      if(!isExistingUser){
        const newUser = await User.create({
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        });
        
        session.currentUser = newUser;
      }

      session.currentUser = isExistingUser;

      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {strategy: 'jwt'},
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET_KEY!
  },
  secret: process.env.NEXTAUTH_SECRET!
}