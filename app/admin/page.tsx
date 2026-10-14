import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { listMilitares } from '@/lib/militares'
import { PageHeading } from '@/components/page-heading'
import { AdminPanel } from '@/components/admin/admin-panel'
import { SignOutButton } from '@/components/admin/sign-out-button'

export const metadata: Metadata = { title: 'Área Restrita' }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/admin/login')

  const militares = await listMilitares()

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <PageHeading
        eyebrow="Área Restrita"
        title="Gestão do Efetivo"
        description={`Autenticado como ${session.user.name} (${session.user.email}).`}
      >
        <SignOutButton />
      </PageHeading>
      <AdminPanel militares={militares} />
    </main>
  )
}
