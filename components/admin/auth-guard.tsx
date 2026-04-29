'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const authed = sessionStorage.getItem('admin_authed')
    if (!authed) {
      router.replace('/admin/login')
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) return null
  return <>{children}</>
}
