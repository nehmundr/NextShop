import { useState } from "react"
import Button from "./Button";

function AddToCartWidget({addToCartFn}){
    const [quantity, setQuantity]=useState(1)
    return(
        <div className="flex">
            <input type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} className='mr-8 my-2 border px-2 py-1'/>
            <Button onClick={()=>addToCartFn(quantity)}>Add To Cart</Button>
        </div>
    )
};

export default AddToCartWidget;