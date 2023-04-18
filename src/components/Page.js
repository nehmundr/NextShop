import Head from "next/head"
import Navbar from "./Navbar"
import Title from "./Title"

function Page({title, children}){
    return(
        <>
        <Head>
            <title>{title} - Next Shop</title>
        </Head>
        <header>
            <Navbar/>
        </header>
        <main className="p-2">
            <Title>{title}</Title>
            {children}
        </main>
        </>
    )
}

export default Page