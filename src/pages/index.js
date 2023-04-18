//fetch from server side
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Page from '@/components/Page';
export async function getStaticProps(){
  const products=await getProducts();
  return {props: {products}, revalidate: parseInt(process.env.REVALIDATE_SECONDS)}
}

function Home({products}) {
  return (
    <Page title="Indoor Plants">
      <ul className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4'>
        {products.map(prod=>
          <li key={prod.id}>
            <ProductCard product={prod}/>
            </li>
        )}
      </ul>
    </Page>
  )
}

export default Home;