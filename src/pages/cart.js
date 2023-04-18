import Page from "@/components/Page"
import { useCartItems } from "@/hooks/cart"
import ProductCard from "@/components/ProductCard";

export default function CartItems(){
    const {cartItems, isLoading}=useCartItems() 
    const headers=['Product','Price','Quantity','Total'];
    
    const calculateTotal=()=>{
        return cartItems.map(item=>item.total).reduce((sum,total)=>{
            console.log(total, sum, typeof sum, typeof total)
             return parseFloat(sum+total)
        },0.00)
    }
    return(
        <Page title={'Cart Items'}>
            {isLoading?
            <div>Loading</div>:(
                <>
                <div className="grid grid-cols-4 w-80 gap-4 text-center">
                    {headers.map(header=><div className="font-bold">{header}</div>)}
                    {cartItems.map(item=><>
                    <div>{item.product.title}</div>
                    <div className="text-right">{`$${item.product.price.toFixed(2)}`}</div>
                    <div className="text-right">{item.quantity}</div>
                    <div className="text-right">{`$${item.total}`}</div>
                    </>)}
                    <div className="font-bold">Total</div>
                    <div></div>
                    <div></div>
                    <div className="font-bold text-right">${parseFloat(calculateTotal()).toFixed(2)}</div>
                </div>
                
                </>
            )
            }
        </Page>
    )
}