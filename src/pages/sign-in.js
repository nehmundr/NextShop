import Field from "@/components/field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSignin } from "@/hooks/user";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter();
  const {isError, isLoading, signIn}=useSignin()
//   const [error, setError]=useState(false);
  // const [status, setStatus]=useState({loading: false, error: false});\


  const handleSubmit = async (event) => {
    event.preventDefault();
    // setStatus({loading: true, error: false})
    // await sleep(2000)

      // const response = await fetchJSON("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password}),
      // });
      // setStatus({loading:false, error: false})
      const valid=await signIn(email,password)
      if(valid){
        router.push('/')
      }
   
 
    
  };
  return (
    <Page title={"Sign In"}>
      <form onSubmit={handleSubmit}>
        <Field label={"Email"}>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field name="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        
        {isError && <p className="text-red-700">Invalid Credentials</p>}
        {isLoading?<p>Loading...</p>:<Button type="submit">Sign In</Button>}
      </form>
    </Page>
  );
}

export default SignInPage;
