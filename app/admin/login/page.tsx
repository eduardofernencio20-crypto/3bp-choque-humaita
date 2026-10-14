import type { Metadata } from 'next'
import Image from 'next/image'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth, hasAnyAdmin } from '@/lib/auth'
import { LoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = { title: 'Login Administrativo' }
export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/admin')

  const setupMode = !(await hasAnyAdmin())

  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-12 sm:py-16">
      <Image
        src="/brasao.png"
        alt=""
        width={96}
        height={96}
        className="size-24 rounded-full border-2 border-primary/60 object-cover"
      />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Área Restrita</p>
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide">
          {setupMode ? 'Configuração Inicial' : 'Acesso Administrativo'}
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          {setupMode
            ? 'Nenhum administrador cadastrado. Crie a primeira conta de administrador; depois disso o cadastro público é encerrado.'
            : 'Entre com suas credenciais de administrador para gerenciar o efetivo.'}
        </p>
      </div>
      <LoginForm mode={setupMode ? 'setup' : 'sign-in'} />
    </main>
  )
}
