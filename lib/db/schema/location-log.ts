import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { location } from './location'

export const locationLogImage = sqliteTable('locationLogImage', {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  locationLogId: int()
    .notNull()
    .references(() => location.id),
  createdAt: int()
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int()
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
})
