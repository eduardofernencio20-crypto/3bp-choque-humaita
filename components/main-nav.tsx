'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/', label: 'Hierarquia' },
  { href: '/documentos', label: 'Documentos' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/editais', label: 'Editais' },
]

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const items = (
    <>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          aria-current={isActive(link.href) ? 'page' : undefined}
          className={cn(
            'rounded px-3 py-2 font-heading text-sm uppercase tracking-wider transition-colors',
            isActive(link.href)
              ? 'bg-primary/10 text-primary'
              : 'text-foreground/80 hover:text-primary',
          )}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/admin"
        onClick={() => setOpen(false)}
        aria-current={pathname.startsWith('/admin') ? 'page' : undefined}
        className="flex items-center gap-2 rounded border border-primary px-3 py-2 font-heading text-sm uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <Lock className="size-3.5" aria-hidden="true" />
        Área Restrita
      </Link>
    </>
  )

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
        {items}
      </nav>
      <button
        type="button"
        className="rounded p-2 text-primary lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
        <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principal"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-primary/30 bg-background p-4 lg:hidden"
        >
          {items}
        </nav>
      )}
    </>
  )
}
