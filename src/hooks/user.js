import { fetchJSON } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const USER_QUERY_KEY = "user";

export function useSignin() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ email, password }) =>
      await fetchJSON("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
  );
  const { isError, isLoading } = mutation;

  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (err) {
        return false;
      }
    },
    isError,
    isLoading,
  };
}

export function useSignOut() {
    const queryClient = useQueryClient();
  const mutation = useMutation(() =>  fetchJSON("/api/signout"));
  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData('user', undefined);
   
  };
}

export function useUser() {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJSON("/api/user");
        // setUser(user);
      } catch (err) {
        //not signed in
      }
    },
    {
      staleTime: 30000,
      cacheTime: Infinity,
    }
  );
  return query.data;
}
