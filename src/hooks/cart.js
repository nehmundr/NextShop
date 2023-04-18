import { fetchJSON } from "@/lib/api";
import { useMutation, useQuery } from "react-query";

export function useCartItems() {
  const { data, isLoading } = useQuery(
    "cartItems",
    async () => {
      return await fetchJSON("/api/cart");
    }
  );
  return { cartItems: data, isLoading };
}

export function useAddToCart() {
  
  const mutation = useMutation(
    async ({ id, quantity }) =>{
        return await fetchJSON("/api/cart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, quantity }),
      })
    }
  );
  const {isError, isLoading}=mutation;
  return {
    addToCart: async (body) => {
      try {
        await mutation.mutateAsync(body);
        return true;
      } catch (err) {
        return false;
      }
    },
    isLoading,
    isError
  };
}
