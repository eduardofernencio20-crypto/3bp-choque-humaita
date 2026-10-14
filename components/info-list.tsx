import type { LucideIcon } from 'lucide-react'

export type InfoItem = {
  titulo: string
  descricao: string
  meta: string
  tag?: string
}

export function InfoList({ items, icon: Icon }: { items: InfoItem[]; icon: LucideIcon }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.titulo}
          className="flex gap-4 rounded border border-border bg-card p-5 transition-colors hover:border-primary/60"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded border border-primary/40 bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-base font-semibold uppercase tracking-wide">
                {item.titulo}
              </h2>
              {item.tag && (
                <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  {item.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-pretty">{item.descricao}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-primary/80">{item.meta}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
