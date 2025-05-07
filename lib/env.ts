import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3000),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  // DATABASE_URL: z.string(),
  // JWT_SECRET: z.string(),
  // JWT_EXPIRES_IN: z.string(),
})

export type Env = z.infer<typeof EnvSchema>

export default EnvSchema.parse(process.env)
