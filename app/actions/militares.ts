'use server'

import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { militares } from '@/lib/db/schema'
import { POSTOS, POSTO_NOMES, postoIndex } from '@/lib/ranks'

export type ActionResult = { ok: true } | { ok: false; error: string }

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autorizado')
  return session.user.id
}

function parseMilitar(formData: FormData) {
  const re = String(formData.get('re') ?? '').trim()
  const nome = String(formData.get('nome') ?? '').trim()
  const posto = String(formData.get('posto') ?? '').trim()
  const atribuicao = String(formData.get('atribuicao') ?? '').trim()
  const dataEntrada = String(formData.get('dataEntrada') ?? '').trim()

  if (!/^\d{1,10}$/.test(re)) return { error: 'RE deve conter apenas números (até 10 dígitos).' }
  if (nome.length < 2 || nome.length > 100) return { error: 'Nome deve ter entre 2 e 100 caracteres.' }
  if (!POSTO_NOMES.includes(posto)) return { error: 'Posto/Graduação inválido.' }
  if (atribuicao.length > 100) return { error: 'Atribuição deve ter no máximo 100 caracteres.' }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataEntrada) || Number.isNaN(Date.parse(dataEntrada)))
    return { error: 'Data de entrada inválida.' }

  return { data: { re, nome, posto, atribuicao, dataEntrada } }
}

function isUniqueViolation(e: unknown) {
  const err = e as { code?: string; cause?: { code?: string } }
  return err?.code === '23505' || err?.cause?.code === '23505'
}

function refresh() {
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function createMilitar(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseMilitar(formData)
  if ('error' in parsed) return { ok: false, error: parsed.error! }
  try {
    await db.insert(militares).values(parsed.data)
  } catch (e) {
    if (isUniqueViolation(e)) return { ok: false, error: 'Já existe um militar com este RE.' }
    console.error('[admin] createMilitar', e)
    return { ok: false, error: 'Não foi possível cadastrar o militar.' }
  }
  refresh()
  return { ok: true }
}

export async function updateMilitar(id: number, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  if (!Number.isInteger(id)) return { ok: false, error: 'Registro inválido.' }
  const parsed = parseMilitar(formData)
  if ('error' in parsed) return { ok: false, error: parsed.error! }
  try {
    await db
      .update(militares)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(militares.id, id))
  } catch (e) {
    if (isUniqueViolation(e)) return { ok: false, error: 'Já existe um militar com este RE.' }
    console.error('[admin] updateMilitar', e)
    return { ok: false, error: 'Não foi possível atualizar o militar.' }
  }
  refresh()
  return { ok: true }
}

export async function changePosto(id: number, direction: 'promover' | 'rebaixar'): Promise<ActionResult> {
  await requireAdmin()
  if (!Number.isInteger(id)) return { ok: false, error: 'Registro inválido.' }
  const [atual] = await db.select().from(militares).where(eq(militares.id, id))
  if (!atual) return { ok: false, error: 'Militar não encontrado.' }

  const idx = postoIndex(atual.posto)
  const novoIdx = direction === 'promover' ? idx - 1 : idx + 1
  if (novoIdx < 0) return { ok: false, error: 'Militar já está no posto mais alto.' }
  if (novoIdx >= POSTOS.length) return { ok: false, error: 'Militar já está na graduação mais baixa.' }

  await db
    .update(militares)
    .set({ posto: POSTOS[novoIdx].nome, updatedAt: new Date() })
    .where(eq(militares.id, id))
  refresh()
  return { ok: true }
}

export async function deleteMilitar(id: number): Promise<ActionResult> {
  await requireAdmin()
  if (!Number.isInteger(id)) return { ok: false, error: 'Registro inválido.' }
  await db.delete(militares).where(eq(militares.id, id))
  refresh()
  return { ok: true }
}
