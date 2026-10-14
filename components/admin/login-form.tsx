'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({ mode }: { mode: 'setup' | 'sign-in' }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    const { error } =
      mode === 'setup'
        ? await authClient.signUp.email({ email, password, name: String(form.get('name') ?? '') })
        : await authClient.signIn.email({ email, password })

    setPending(false)
    if (error) {
      setError(
        mode === 'setup'
          ? 'Não foi possível criar a conta. Verifique os dados (senha com no mínimo 8 caracteres).'
          : 'E-mail ou senha inválidos.',
      )
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-4 rounded border border-primary/30 bg-card p-6"
    >
      {mode === 'setup' && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" required minLength={2} autoComplete="name" />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === 'setup' ? 'new-password' : 'current-password'}
        />
      </div>
      {error && (
        <p role="alert" className="rounded border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="font-heading uppercase tracking-wider">
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {mode === 'setup' ? 'Criar administrador' : 'Entrar'}
      </Button>
    </form>
  )
}
