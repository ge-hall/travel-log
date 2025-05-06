import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3000),

  // DATABASE_URL: z.string(),
  // JWT_SECRET: z.string(),
  // JWT_EXPIRES_IN: z.string(),
})

export type Env = z.infer<typeof EnvSchema>

export default EnvSchema.parse(process.env)
