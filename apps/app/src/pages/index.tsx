import { Layout } from '@components/Layout'

export default function HomePage() {
  return (
    <Layout>
      <h1 className='mx-auto text-center text-3xl font-extrabold leading-[1.1] tracking-tighter text-white'>
        <span className='inline-block bg-gradient-to-r from-pt-purple to-pt-teal-dark bg-clip-text text-transparent'>
          PoolTogether Hyperstructure App (WIP)
        </span>
      </h1>
    </Layout>
  )
}
