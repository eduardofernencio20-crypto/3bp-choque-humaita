import Image from 'next/image'
import { getPosto } from '@/lib/ranks'

const imagens: Record<string, string> = {
  'Tenente-Coronel PM': 'tenente-coronel.png',
  'Major PM': 'major.png',
  'Capitão PM': 'capitao.png',
  '1º Tenente PM': '1-tenente.png',
  '2º Tenente PM': '2-tenente.png',
  'Aspirante a Oficial PM': 'aspirante.png',
  'Subtenente PM': 'subtenente.png',
  '1º Sargento PM': '1-sargento.png',
  '2º Sargento PM': '2-sargento.png',
  '3º Sargento PM': '3-sargento.png',
  'Cabo PM': 'cabo.png',
  'Soldado PM 1ª Classe': 'soldado.png',
  'Soldado PM 2ª Classe': 'soldado.png',
}

export function Insignia({ posto }: { posto: string }) {
  const p = getPosto(posto)
  if (!p) return <span className="text-muted-foreground">—</span>
  const arquivo = imagens[posto]
  return (
    <span className="flex items-center gap-2" title={p.nome}>
      {arquivo ? (
        <Image src={`/insignias/${arquivo}`} alt={`Insígnia de ${p.nome}`} width={66} height={30} className="h-8 w-auto max-w-[76px] object-contain" />
      ) : <span className="text-muted-foreground">—</span>}
      <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-heading text-[11px] tracking-wider text-primary">{p.sigla}</span>
    </span>
  )
}
