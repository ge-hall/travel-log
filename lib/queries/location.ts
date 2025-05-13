import { and, eq } from 'drizzle-orm';
import slugify from 'slug';
import { customAlphabet } from 'nanoid';
import db from '~/lib/db';
import { location } from '~/lib/db/schema/location';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 5);

/** Insert new locatino */
export async function insertLocation(data: { slug: string; userId: string; name: string; description: string | null; lat: number; long: number }) {
  return await db.insert(location).values(data).returning();
}
/** Check if slug exists */
export async function slugExists(slug: string, userId: string) {
  return !!(await db.query.location.findFirst(
    {
      where: and(eq(location.slug, slug), eq(location.userId, userId)),
    }));
}

/** Get unique slug for location name */
export async function getUniqueSlugForLocationName(locationName: string, userId: string) {
  let slug = slugify(locationName);
  let exists = await slugExists(slug, userId);
  while (exists) {
    const postfixed_slug = `${slug}-${nanoid()}`;
    exists = await slugExists(postfixed_slug, userId);
    if (!exists) {
      slug = postfixed_slug;
    }
  }
  return slug;
}
