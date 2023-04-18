//option-1: fetch from client side

import Head from 'next/head'
import Title from '@/components/Title';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products';
// const products=[
//   {id: 1, title:"Product 1"},
//   {id:2, title:"Product 2"},
// ]

function Home() {
  const [products, setProducts]=useState([]);

  useEffect(()=>{
    // getProducts().then(data=>setProducts(data))
    (async()=>{
      const response=fetch('/api/products');
      setProducts(response.json())
    })()
    
  },[])
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