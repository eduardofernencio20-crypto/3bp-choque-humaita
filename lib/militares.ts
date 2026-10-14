import { asc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { militares, type Militar } from '@/lib/db/schema'
import { postoIndex } from '@/lib/ranks'

export async function listMilitares(): Promise<Militar[]> {
  const rows = await db.select().from(militares).orderBy(asc(militares.dataEntrada))
  return rows.sort((a, b) => postoIndex(a.posto) - postoIndex(b.posto))
}
