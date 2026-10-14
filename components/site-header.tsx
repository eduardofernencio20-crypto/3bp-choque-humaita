import Image from 'next/image'
import Link from 'next/link'
import { MainNav } from '@/components/main-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/30 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brasao.png"
            alt="Brasão do 3º BP-Choque Humaitá"
            width={48}
            height={48}
            className="size-11 rounded-full border border-primary/50 object-cover sm:size-12"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base font-semibold tracking-wide text-primary sm:text-lg">
              3º BP-CHOQUE HUMAITÁ
            </span>
            <span className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground sm:text-xs">
              SISTEMA INTERNO
            </span>
          </span>
        </Link>
        <MainNav />
      </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </header>
  )
}
