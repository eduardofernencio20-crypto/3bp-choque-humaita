export const CATEGORIAS = [
  'Oficiais Superiores',
  'Oficiais Intermediários',
  'Oficiais Subalternos',
  'Praças Graduados',
  'Praças',
] as const

export type Categoria = (typeof CATEGORIAS)[number]

export type InsigniaTipo = 'estrela' | 'estrela-vazada' | 'divisa' | 'triangulo' | 'nenhuma'

export type Posto = {
  nome: string
  sigla: string
  categoria: Categoria
  insignia: { tipo: InsigniaTipo; quantidade: number }
}

// Ordered from the highest rank to the lowest.
export const POSTOS: Posto[] = [
  { nome: 'Coronel PM', sigla: 'CEL PM', categoria: 'Oficiais Superiores', insignia: { tipo: 'estrela', quantidade: 3 } },
  { nome: 'Tenente-Coronel PM', sigla: 'TEN CEL PM', categoria: 'Oficiais Superiores', insignia: { tipo: 'estrela', quantidade: 2 } },
  { nome: 'Major PM', sigla: 'MAJ PM', categoria: 'Oficiais Superiores', insignia: { tipo: 'estrela', quantidade: 1 } },
  { nome: 'Capitão PM', sigla: 'CAP PM', categoria: 'Oficiais Intermediários', insignia: { tipo: 'estrela-vazada', quantidade: 3 } },
  { nome: '1º Tenente PM', sigla: '1º TEN PM', categoria: 'Oficiais Subalternos', insignia: { tipo: 'estrela-vazada', quantidade: 2 } },
  { nome: '2º Tenente PM', sigla: '2º TEN PM', categoria: 'Oficiais Subalternos', insignia: { tipo: 'estrela-vazada', quantidade: 1 } },
  { nome: 'Aspirante a Oficial PM', sigla: 'ASP OF PM', categoria: 'Oficiais Subalternos', insignia: { tipo: 'nenhuma', quantidade: 0 } },
  { nome: 'Subtenente PM', sigla: 'SUBTEN PM', categoria: 'Praças Graduados', insignia: { tipo: 'triangulo', quantidade: 1 } },
  { nome: '1º Sargento PM', sigla: '1º SGT PM', categoria: 'Praças Graduados', insignia: { tipo: 'divisa', quantidade: 4 } },
  { nome: '2º Sargento PM', sigla: '2º SGT PM', categoria: 'Praças Graduados', insignia: { tipo: 'divisa', quantidade: 3 } },
  { nome: '3º Sargento PM', sigla: '3º SGT PM', categoria: 'Praças Graduados', insignia: { tipo: 'divisa', quantidade: 2 } },
  { nome: 'Cabo PM', sigla: 'CB PM', categoria: 'Praças Graduados', insignia: { tipo: 'divisa', quantidade: 1 } },
  { nome: 'Soldado PM 1ª Classe', sigla: 'SD PM 1ª CL', categoria: 'Praças', insignia: { tipo: 'nenhuma', quantidade: 0 } },
  { nome: 'Soldado PM 2ª Classe', sigla: 'SD PM 2ª CL', categoria: 'Praças', insignia: { tipo: 'nenhuma', quantidade: 0 } },
]

export const POSTO_NOMES = POSTOS.map((p) => p.nome)

export function getPosto(nome: string): Posto | undefined {
  return POSTOS.find((p) => p.nome === nome)
}

export function postoIndex(nome: string): number {
  const i = POSTOS.findIndex((p) => p.nome === nome)
  return i === -1 ? POSTOS.length : i
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-')
  return d && m && y ? `${d}/${m}/${y}` : iso
}
