import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { PageHeading } from '@/components/page-heading'
import { InfoList, type InfoItem } from '@/components/info-list'

export const metadata: Metadata = { title: 'Documentos' }

const DOCUMENTOS: InfoItem[] = [
  { titulo: 'Regulamento Disciplinar', descricao: 'Normas de conduta, transgressões disciplinares e sanções aplicáveis a todo o efetivo do batalhão.', meta: 'RDPM-H · Revisão 2026', tag: 'Obrigatório' },
  { titulo: 'Estatuto do Batalhão', descricao: 'Estrutura organizacional, missão, valores e cadeia de comando do 3º BP-Choque Humaitá.', meta: 'Documento base' },
  { titulo: 'Manual de Abordagem', descricao: 'Procedimentos operacionais padrão para abordagem a pessoas e veículos em patrulhamento.', meta: 'POP-01' },
  { titulo: 'Uso Progressivo da Força', descricao: 'Níveis de força, critérios de emprego e uso de equipamentos menos letais.', meta: 'POP-02' },
  { titulo: 'Controle de Distúrbios Civis', descricao: 'Formações, comandos e emprego tático da tropa de choque em operações de CDC.', meta: 'POP-03 · Restrito ao efetivo' },
  { titulo: 'Código de Rádio (Q e 10)', descricao: 'Códigos de comunicação utilizados nas frequências operacionais do batalhão.', meta: 'Comunicações' },
  { titulo: 'Uniformes e Viaturas', descricao: 'Padrões de fardamento, equipamentos individuais e viaturas autorizadas por função.', meta: 'Logística' },
  { titulo: 'Critérios de Promoção', descricao: 'Interstícios, cursos exigidos e avaliação de mérito para ascensão hierárquica.', meta: 'Recursos Humanos' },
]

export default function DocumentosPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <PageHeading
        eyebrow="Biblioteca Interna"
        title="Documentos e Regulamentos"
        description="Regulamentos, manuais e procedimentos operacionais que norteiam a atuação do batalhão."
      />
      <InfoList items={DOCUMENTOS} icon={FileText} />
    </main>
  )
}
