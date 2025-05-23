import Head from 'next/head'
import HomePage from '../components/HomePage'

export default function HomePageWrapper() {
  return (
    <>
      <Head>
        <title>eSports System ? Home</title>
      </Head>
      <HomePage />
    </>
  )
}
