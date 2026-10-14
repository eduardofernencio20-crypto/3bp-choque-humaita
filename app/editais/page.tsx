import type { Metadata } from 'next'
import { Megaphone } from 'lucide-react'
import { PageHeading } from '@/components/page-heading'
import { InfoList, type InfoItem } from '@/components/info-list'

export const metadata: Metadata = { title: 'Editais' }

const EDITAIS: InfoItem[] = [
  { titulo: 'Edital 001/2026 — Recrutamento', descricao: 'Abertura de processo seletivo para ingresso no Curso de Formação de Soldados do batalhão.', meta: 'Publicado em 01/10/2026', tag: 'Novo' },
  { titulo: 'Comunicado — Escala de Serviço', descricao: 'Atualização da escala operacional e dos horários de patrulhamento das companhias.', meta: 'Publicado em 28/09/2026' },
  { titulo: 'Edital 002/2026 — Curso de CDC', descricao: 'Vagas para o Curso de Controle de Distúrbios Civis. Requisitos e cronograma de provas.', meta: 'Publicado em 20/09/2026' },
  { titulo: 'Boletim Interno — Promoções', descricao: 'Relação de militares promovidos por merecimento e antiguidade no último ciclo.', meta: 'Publicado em 15/09/2026' },
  { titulo: 'Comunicado — Novo Fardamento', descricao: 'Padronização do uniforme operacional de choque e prazos de adequação.', meta: 'Publicado em 05/09/2026' },
  { titulo: 'Comunicado — Conduta em Rádio', descricao: 'Reforço das regras de disciplina e uso dos canais de comunicação operacional.', meta: 'Publicado em 30/08/2026' },
]

export default function EditaisPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <PageHeading
        eyebrow="Publicações Oficiais"
        title="Editais e Comunicados"
        description="Editais de seleção, boletins internos e comunicados do comando."
      />
      <InfoList items={EDITAIS} icon={Megaphone} />
    </main>
  )
}
