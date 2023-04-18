import { useUser } from "@/hooks/user";
import Link from "next/link";
import { useSignOut } from "@/hooks/user";
import { fetchJSON } from "@/lib/api";

// import { useQuery } from "react-query";
import { useEffect, useState } from "react";

function Navbar() {
  // const [user, setUser] = useState();
  // const query=useQuery('user', async()=>{
  //   try {
  //     return  await fetchJSON("/api/user");
  //     // setUser(user);
  //   } catch (err) {
  //     //not signed in
  //   }
  // },{
  //   staleTime: 30000,
  //   cacheTime: Infinity
  // })

  const signOut = useSignOut();
  const user = useUser();

  // const handleSignOut=async()=>{
  // await fetchJSON('/api/signout');
  // setUser(undefined)
  // queryClient.setQueryData('user', undefined);
  // }
  // useEffect(() => {
  //   (async () => {
     
  //   })();
  // }, []);

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex justify-between">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        {/* <li role="separator" className="flex-1"></li> */}
        {user ? (
          <>
            <li>
              <Link href="/cart" className="px-4">
                Cart
              </Link>
              <span className="px-4">{user.name}</span>
              <Link href="/">
                <button onClick={signOut}>Sign Out</button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
