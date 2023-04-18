//fetch from server side

import Head from 'next/head'
import Title from '@/components/Title';
import { getProducts } from '@/lib/products';

const products=[
  {id: 1, title:"Product 1"},
  {id:2, title:"Product 2"},
]

export async function getStaticProps(){
  const products=await getProducts();
  return {props: {products}, revalidate: 60}
}

function Home({products}) {
  return (
    <>
    <Head>
      <title>Next Shop</title>
    </Head>
    <main className='p-1'>
      {/* <h1 className='text-2xl pb-4'>Next Shop</h1> */}
      <Title>Next Shop</Title>
      <ul>
        {products.map(prod=>
          <li key={prod.id}>{prod.title}</li>
        )}
      </ul>
    </main>
    </>
  )
}

export default Home;