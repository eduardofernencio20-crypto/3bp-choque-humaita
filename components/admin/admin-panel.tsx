'use client'

import { useMemo, useState, useTransition } from 'react'
import { ChevronDown, ChevronUp, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Insignia } from '@/components/insignia'
import { MilitarDialog } from '@/components/admin/militar-dialog'
import { changePosto, deleteMilitar } from '@/app/actions/militares'
import type { Militar } from '@/lib/db/schema'
import { formatDate, postoIndex, POSTOS } from '@/lib/ranks'

export function AdminPanel({ militares }: { militares: Militar[] }) {
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Militar | null>(null)
  const [creating, setCreating] = useState(false)
  const [removing, setRemoving] = useState<Militar | null>(null)
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return militares
    return militares.filter((m) => m.nome.toLowerCase().includes(q) || m.re.includes(q))
  }, [militares, query])

  function run(action: () => Promise<{ ok: boolean; error?: string }>, success: string) {
    startTransition(async () => {
      const res = await action()
      setMessage(res.ok ? { type: 'ok', text: success } : { type: 'error', text: res.error ?? 'Erro.' })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            aria-label="Pesquisar por nome ou RE"
            placeholder="Pesquisar por nome ou RE"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setCreating(true)} className="font-heading uppercase tracking-wider">
          <Plus className="size-4" aria-hidden="true" />
          Cadastrar militar
        </Button>
      </div>

      {message && (
        <p
          role="status"
          className={
            message.type === 'ok'
              ? 'rounded border border-primary/40 bg-primary/10 p-3 text-sm text-primary'
              : 'rounded border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive'
          }
        >
          {message.text}
        </p>
      )}

      <ul className="flex flex-col gap-2" aria-busy={pending}>
        {filtered.length === 0 && (
          <li className="rounded border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nenhum militar encontrado.
          </li>
        )}
        {filtered.map((m) => {
          const idx = postoIndex(m.posto)
          return (
            <li
              key={m.id}
              className="flex flex-col gap-3 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-sm text-primary">RE {m.re}</span>
                  <span className="font-medium">{m.nome}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <Insignia posto={m.posto} />
                  <span>{m.posto}</span>
                  <span>{m.atribuicao || 'Sem atribuição'}</span>
                  <span className="tabular-nums">Entrada: {formatDate(m.dataEntrada)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pending || idx <= 0}
                  onClick={() => run(() => changePosto(m.id, 'promover'), `${m.nome} promovido(a).`)}
                >
                  <ChevronUp className="size-4" aria-hidden="true" />
                  Promover
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pending || idx >= POSTOS.length - 1}
                  onClick={() => run(() => changePosto(m.id, 'rebaixar'), `${m.nome} rebaixado(a).`)}
                >
                  <ChevronDown className="size-4" aria-hidden="true" />
                  Rebaixar
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setEditing(m)}>
                  <Pencil className="size-4" aria-hidden="true" />
                  Editar
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setRemoving(m)}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Remover
                </Button>
              </div>
            </li>
          )
        })}
      </ul>

      <MilitarDialog
        open={creating || editing !== null}
        militar={editing}
        onOpenChange={(open) => {
          if (!open) {
            setCreating(false)
            setEditing(null)
          }
        }}
        onSaved={(text) => setMessage({ type: 'ok', text })}
      />

      <AlertDialog open={removing !== null} onOpenChange={(open) => !open && setRemoving(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover militar?</AlertDialogTitle>
            <AlertDialogDescription>
              {removing && `${removing.posto} ${removing.nome} (RE ${removing.re}) será removido(a) do efetivo. Esta ação não pode ser desfeita.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (!removing) return
                const alvo = removing
                setRemoving(null)
                run(() => deleteMilitar(alvo.id), `${alvo.nome} removido(a) do efetivo.`)
              }}
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
