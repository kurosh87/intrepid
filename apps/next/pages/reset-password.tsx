import { AuthLayout } from 'app/features/auth/layout.web'
import { ResetPassword } from 'app/features/auth/reset-password-screen'
import Head from 'next/head'

import { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Reset Password</title>
    </Head>
    <ResetPassword />
  </>
)

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>

export default Page