'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Insignia } from '@/components/insignia'
import type { Militar } from '@/lib/db/schema'
import { CATEGORIAS, POSTOS, formatDate, getPosto } from '@/lib/ranks'

const selectClass =
  'h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function HierarchyBoard({ militares }: { militares: Militar[] }) {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [posto, setPosto] = useState('todos')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return militares.filter((m) => {
      if (posto !== 'todos' && m.posto !== posto) return false
      if (categoria !== 'todas' && getPosto(m.posto)?.categoria !== categoria) return false
      if (q && !m.nome.toLowerCase().includes(q) && !m.re.toLowerCase().includes(q)) return false
      return true
    })
  }, [militares, query, categoria, posto])

  const postosDisponiveis =
    categoria === 'todas' ? POSTOS : POSTOS.filter((p) => p.categoria === categoria)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-3 rounded border border-border bg-card p-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="busca">Pesquisar</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="busca"
              placeholder="Nome ou RE"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categoria">Círculo</Label>
          <select
            id="categoria"
            className={selectClass}
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value)
              setPosto('todos')
            }}
          >
            <option value="todas">Todos os círculos</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="posto">Patente</Label>
          <select
            id="posto"
            className={selectClass}
            value={posto}
            onChange={(e) => setPosto(e.target.value)}
          >
            <option value="todos">Todas as patentes</option>
            {postosDisponiveis.map((p) => (
              <option key={p.nome} value={p.nome}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="rounded border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nenhum militar encontrado com os filtros atuais.
        </p>
      )}

      {CATEGORIAS.map((cat) => {
        const grupo = filtered.filter((m) => getPosto(m.posto)?.categoria === cat)
        if (grupo.length === 0) return null
        return (
          <section key={cat} aria-labelledby={`cat-${cat}`} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2
                id={`cat-${cat}`}
                className="font-heading text-lg font-semibold uppercase tracking-wider text-primary"
              >
                {cat}
              </h2>
              <span className="h-px flex-1 bg-primary/30" />
              <span className="text-xs text-muted-foreground">{grupo.length}</span>
            </div>
            <MilitaresTable militares={grupo} />
          </section>
        )
      })}
    </div>
  )
}

function MilitaresTable({ militares }: { militares: Militar[] }) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded border border-border md:block">
        <table className="w-full text-sm">
          <thead className="bg-primary text-primary-foreground">
            <tr className="font-heading text-xs uppercase tracking-wider">
              <th scope="col" className="px-4 py-2.5 text-left">RE</th>
              <th scope="col" className="px-4 py-2.5 text-left">Nome</th>
              <th scope="col" className="px-4 py-2.5 text-left">Insígnia</th>
              <th scope="col" className="px-4 py-2.5 text-left">Posto/Graduação</th>
              <th scope="col" className="px-4 py-2.5 text-left">Atribuição</th>
              <th scope="col" className="px-4 py-2.5 text-left">Data de Entrada</th>
            </tr>
          </thead>
          <tbody>
            {militares.map((m) => (
              <tr key={m.id} className="border-t border-border bg-card odd:bg-background hover:bg-accent/40">
                <td className="px-4 py-3 font-mono text-primary">{m.re}</td>
                <td className="px-4 py-3 font-medium">{m.nome}</td>
                <td className="px-4 py-3"><Insignia posto={m.posto} /></td>
                <td className="px-4 py-3">{m.posto}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.atribuicao || '—'}</td>
                <td className="px-4 py-3 tabular-nums">{formatDate(m.dataEntrada)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-2 md:hidden">
        {militares.map((m) => (
          <li key={m.id} className="flex flex-col gap-2 rounded border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{m.nome}</p>
                <p className="text-xs text-muted-foreground">{m.posto}</p>
              </div>
              <span className="font-mono text-sm text-primary">RE {m.re}</span>
            </div>
            <Insignia posto={m.posto} />
            <dl className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Atribuição</dt>
                <dd>{m.atribuicao || '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Entrada</dt>
                <dd className="tabular-nums">{formatDate(m.dataEntrada)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
