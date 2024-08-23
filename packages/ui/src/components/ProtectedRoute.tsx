import { useRouter } from 'next/router'
import { useAuth } from '../../../../apps/next/contexts/AuthContext'

export const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
      return <div>Loading...</div>
    }

    if (!user) {
      router.push('/auth')
      return null
    }

    return <WrappedComponent {...props} />
  }
}