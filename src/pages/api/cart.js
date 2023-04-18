const { fetchJSON } = require("@/lib/api");

function stripCartItem(cartItem){
  return {
    id: cartItem.id,
    product:{
      id:cartItem.product.id,
      title: cartItem.product.title,
      price:cartItem.product.price
    },
    quantity: cartItem.quantity,
    total: parseFloat(cartItem.quantity*cartItem.product.price)
  }
}


async function fetchCartItems(req, res) {
  try {
    const { jwt } = req.cookies;
    if (!jwt) {
      res.status(401).end();
      return;
    }
    const response = await fetchJSON(process.env.CMS_URL + "/cart-items", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json( response.map(res=>stripCartItem(res)));
  } catch (err) {
    res.status(401).end();
  }
};

async function addToCartItem(req, res){
  try{
    const { jwt } = req.cookies;
    if (!jwt) {
      res.status(401).end();
      return;
    };
    console.log(req.body)
    const {id, quantity}=req.body;
    const response = await fetchJSON(process.env.CMS_URL+"/cart-items",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${jwt}`
      },
      body: JSON.stringify({product:id, quantity})
    });

    res.status(200).json({})

  }catch(err){
    console.log(err)
    res.status(405).end();
  }
}

export default function handleCart(req, res){
  switch(req.method){
    case 'GET':
      return fetchCartItems(req,res);
    case 'POST':
      console.log("in post")
      return addToCartItem(req, res);
    default:
      return fetchCartItems(req, res)
  }
}
