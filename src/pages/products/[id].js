import Title from "@/components/Title";
import { getProducts, getProductDetails } from "@/lib/products";
import { ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import Page from "@/components/Page";
import Button from "@/components/Button";
import { useAddToCart } from "@/hooks/cart";
import AddToCartWidget from "@/components/AddToCartWidget";
import { useUser } from "@/hooks/user";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({ params: { id: `${product.id}` } })),
    fallback: "blocking", //if new items are added
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const productDetails = await getProductDetails(id);
    return {
      props: { productDetails },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    // return { notFound: true };
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

function ProductDetails({ productDetails }) {
  const {addToCart, isLoading, isError}=useAddToCart();
  const router=useRouter();
  const addToCartFn=async (quantity)=>{
    await addToCart({id:productDetails.id, quantity});
    router.push('/cart')
  }
  const user=useUser()
  return (
    <Page title={productDetails.title}>
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4">
        <Image src={productDetails.pictureUrl} width={640} height={480} />
        <div>
          <div>{productDetails.description}</div>
          <p className="text-lg font-bold">{`$ ${productDetails.price}`}</p>
        </div>
      </div>
      {user && <div className="flex justify-center">
          {isLoading?<div>Loading</div>:<AddToCartWidget addToCartFn={addToCartFn}/>}
      </div>}
    </Page>
  );
}

export default ProductDetails;
