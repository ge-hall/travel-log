import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'
import { location } from './location'

export const locationLogImage = sqliteTable('locationLogImage', {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  locationLogId: int()
    .notNull()
    .references(() => location.id),
  userId: int().notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: int()
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int()
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
})
