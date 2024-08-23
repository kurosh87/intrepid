import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import { 
  YStack, XStack, Text, Button, Spinner, Card, H2, 
  useTheme, ThemeProvider, Sheet, Paragraph, Progress,
  Avatar, Banner, CircularProgress, DataTable, Tooltip, Menu
} from 'tamagui'
import { supabase } from '../lib/supabase'
import { ChevronDown, LogOut } from '@tamagui/lucide-icons'

const Dashboard = () => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
  }, [user, loading])

  if (loading) {
    return (
      <YStack f={1} jc="center" ai="center">
        <CircularProgress size="large" />
      </YStack>
    )
  }

  if (!user) {
    return null
  }

  const userDetails = [
    { key: 'Email', value: user.email },
    { key: 'Created At', value: new Date(user.created_at).toLocaleString() },
  ]

  return (
    <ThemeProvider name={theme.name === 'light' ? 'dark' : 'light'}>
      <YStack f={1} jc="center" ai="center" p="$4" space="$4">
        <Banner 
          title="Welcome to your dashboard"
          description="Manage your account and settings here"
          action={<Button>Learn More</Button>}
        />

        <Card elevate size="$4" bordered p="$4" w="100%" maw={600}>
          <YStack space="$4">
            <XStack jc="space-between" ai="center">
              <H2>Dashboard</H2>
              <Avatar circular size="$4" src={user.user_metadata?.avatar_url || undefined} />
            </XStack>

            <Paragraph ta="center" theme="alt2">Welcome, {user.email}</Paragraph>
            
            <Progress value={75} />
            
            <DataTable
              data={userDetails}
              columns={[
                { accessor: 'key', header: 'Detail' },
                { accessor: 'value', header: 'Value' },
              ]}
            />

            <XStack jc="space-between" ai="center">
              <Text>Account Status:</Text>
              <Tooltip content="View more details">
                <Menu
                  trigger={<Button icon={ChevronDown} circular size="$3" />}
                  items={[
                    { key: 'profile', label: 'View Profile' },
                    { key: 'settings', label: 'Account Settings' },
                  ]}
                />
              </Tooltip>
            </XStack>

            <Button
              size="$4"
              theme="red"
              icon={LogOut}
              onPress={async () => {
                await supabase.auth.signOut()
                router.push('/sign-in')
              }}
            >
              Sign Out
            </Button>
          </YStack>
        </Card>
      </YStack>
    </ThemeProvider>
  )
}

export default Dashboard