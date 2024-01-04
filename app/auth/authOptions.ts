// @/app/auth/authOptions.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Prisma adaptor
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/prisma/client';

const authOptions: NextAuthOptions = {
  // Prisma adaptor
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Prisma adaptor
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;