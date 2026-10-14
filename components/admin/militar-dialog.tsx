'use client'

import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createMilitar, updateMilitar } from '@/app/actions/militares'
import type { Militar } from '@/lib/db/schema'
import { CATEGORIAS, POSTOS } from '@/lib/ranks'

const selectClass =
  'h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function MilitarDialog({
  open,
  militar,
  onOpenChange,
  onSaved,
}: {
  open: boolean
  militar: Militar | null
  onOpenChange: (open: boolean) => void
  onSaved: (message: string) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const today = new Date().toISOString().slice(0, 10)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      const res = militar ? await updateMilitar(militar.id, formData) : await createMilitar(formData)
      if (!res.ok) {
        setError(res.error)
        return
      }
      onSaved(militar ? 'Dados atualizados.' : 'Militar cadastrado.')
      onOpenChange(false)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) setError(null)
        onOpenChange(o)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading uppercase tracking-wide">
            {militar ? 'Editar militar' : 'Cadastrar militar'}
          </DialogTitle>
          <DialogDescription>
            {militar ? 'Atualize posto, função e data de entrada.' : 'Preencha os dados do novo militar.'}
          </DialogDescription>
        </DialogHeader>
        <form key={militar?.id ?? 'new'} onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="re">RE</Label>
              <Input id="re" name="re" inputMode="numeric" pattern="\d{1,10}" required defaultValue={militar?.re} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" required minLength={2} maxLength={100} defaultValue={militar?.nome} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="posto-form">Posto/Graduação</Label>
            <select
              id="posto-form"
              name="posto"
              required
              className={selectClass}
              defaultValue={militar?.posto ?? 'Soldado PM 2ª Classe'}
            >
              {CATEGORIAS.map((cat) => (
                <optgroup key={cat} label={cat}>
                  {POSTOS.filter((p) => p.categoria === cat).map((p) => (
                    <option key={p.nome} value={p.nome}>
                      {p.nome}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="atribuicao">Atribuição</Label>
              <Input
                id="atribuicao"
                name="atribuicao"
                maxLength={100}
                placeholder="Ex.: Comandante"
                defaultValue={militar?.atribuicao}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dataEntrada">Data de entrada</Label>
              <Input
                id="dataEntrada"
                name="dataEntrada"
                type="date"
                required
                defaultValue={militar?.dataEntrada ?? today}
              />
            </div>
          </div>
          {error && (
            <p role="alert" className="rounded border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={pending}>
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
