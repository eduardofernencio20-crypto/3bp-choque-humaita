'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const router = useRouter()
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await authClient.signOut()
        router.push('/admin/login')
        router.refresh()
      }}
    >
      <LogOut className="size-4" aria-hidden="true" />
      Sair
    </Button>
  )
}
