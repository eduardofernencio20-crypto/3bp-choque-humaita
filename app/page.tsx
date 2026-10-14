import { PageHeading } from '@/components/page-heading'
import { HierarchyBoard } from '@/components/hierarquia/hierarchy-board'
import { listMilitares } from '@/lib/militares'

export const dynamic = 'force-dynamic'

export default async function HierarquiaPage() {
  const militares = await listMilitares()

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <PageHeading
        eyebrow="Efetivo do Batalhão"
        title="Hierarquia — 3º BP-Choque Humaitá"
        description="Quadro oficial do efetivo, organizado por círculo hierárquico. Consulta pública; alterações apenas por administradores autenticados."
      >
        <div className="flex items-center gap-3 rounded border border-primary/40 bg-primary/5 px-4 py-3">
          <span className="font-heading text-3xl font-bold text-primary">{militares.length}</span>
          <span className="text-xs uppercase leading-tight tracking-wider text-muted-foreground">
            Militares
            <br />
            cadastrados
          </span>
        </div>
      </PageHeading>
      <HierarchyBoard militares={militares} />
    </main>
  )
}
