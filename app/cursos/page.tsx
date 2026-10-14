import type { Metadata } from 'next'
import { GraduationCap } from 'lucide-react'
import { PageHeading } from '@/components/page-heading'
import { InfoList, type InfoItem } from '@/components/info-list'

export const metadata: Metadata = { title: 'Cursos' }

const CURSOS: InfoItem[] = [
  { titulo: 'Curso de Formação de Soldados', descricao: 'Formação básica: legislação, abordagem, armamento, tiro e conduta policial.', meta: 'CFSd · Ingresso no batalhão', tag: 'Inscrições abertas' },
  { titulo: 'Controle de Distúrbios Civis', descricao: 'Formações de choque, escudos, munições químicas e progressão em ambiente hostil.', meta: 'CDC · Requisito: Soldado 1ª Classe' },
  { titulo: 'Patrulhamento Tático', descricao: 'Patrulha motorizada, cerco e bloqueio, acompanhamento tático de veículos.', meta: 'CPT · Operacional' },
  { titulo: 'Operações Especiais de Choque', descricao: 'Entradas táticas, gerenciamento de crises e apoio a operações de alto risco.', meta: 'COEsp · Seleção interna' },
  { titulo: 'Curso de Formação de Sargentos', descricao: 'Liderança de frações, comando de guarnição e instrução de tropa.', meta: 'CFS · Requisito: Cabo PM' },
  { titulo: 'Curso de Aperfeiçoamento de Oficiais', descricao: 'Planejamento operacional, gestão de efetivo e comando de companhia.', meta: 'CAO · Oficiais' },
]

export default function CursosPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <PageHeading
        eyebrow="Instrução e Ensino"
        title="Cursos Operacionais"
        description="Capacitações oferecidas pelo batalhão para formação, especialização e promoção do efetivo."
      />
      <InfoList items={CURSOS} icon={GraduationCap} />
    </main>
  )
}
