import { fetchJSON } from "./api";

export function stripProducts({id,title, price, picture, description}){
    return {
        id,
        title,
        price,
        description,
        pictureUrl: process.env.CMS_URL + picture.url
    }
}


export async function getProducts() {
  const data = await fetchJSON(`${process.env.CMS_URL}/products`)
  return data.map(product=>stripProducts(product));
}

export async function getProductDetails(id){
    const data = await fetchJSON(`${process.env.CMS_URL}/products/${id}`);
    const returnObj=stripProducts(data); 
    return returnObj
}
