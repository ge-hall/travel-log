import { betterAuth } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from './db/index'; // your drizzle instance
import env from './env';

export const auth = betterAuth({
  hooks: {
    after:
      createAuthMiddleware(async (ctx) => {
        if (ctx.path == '/get-session') {
          if (!ctx.context.session) {
            return ctx.json({
              session: null,
              user: null,
            });
          }
        }
      }),

  },
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or "mysql", "sqlite"
  }),

  advanced: {
    generateId: false,
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET as string,
    },
  },
});
