import { Layout } from '@components/Layout'

export default function HomePage() {
  return (
    <Layout>
      <div className='flex flex-col flex-grow items-center py-2'>
        <main className='mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8'>
          <h1 className='mx-auto max-w-5xl text-center text-3xl font-extrabold leading-[1.1] tracking-tighter text-white'>
            <span className='inline-block bg-gradient-to-r from-pt-purple to-pt-teal-dark bg-clip-text text-transparent'>
              PoolTogether Hyperstructure App (WIP)
            </span>
          </h1>
        </main>
      </div>
    </Layout>
  )
}
