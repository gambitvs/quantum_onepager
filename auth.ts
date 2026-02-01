import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// User roles for RBAC
export type UserRole = "admin" | "researcher" | "investor" | "viewer";

// Extended user type
declare module "next-auth" {
  interface User {
    role?: UserRole;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }
}

// Credential validation schema
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // TODO: Replace with real database lookup
        // For now, demo credentials for testing
        if (
          parsed.data.email === "demo@quantumcapital.ai" &&
          parsed.data.password === "quantum2026"
        ) {
          return {
            id: "demo-user-1",
            email: parsed.data.email,
            name: "Demo User",
            role: "researcher" as UserRole,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "viewer";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as UserRole) || "viewer";
      }
      return session;
    },
    async signIn({ user, account }) {
      // Allow all OAuth sign-ins
      if (account?.provider === "github" || account?.provider === "google") {
        return true;
      }
      // Allow credentials if user exists
      if (account?.provider === "credentials" && user) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
});
