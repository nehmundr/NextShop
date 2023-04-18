import { fetchJSON } from "@/lib/api";

async function handleUser(req,res){
    const {jwt}=req.cookies;
    console.log(jwt)
    if(!jwt){
        res.status(401).end();
        return;
    }
    try{
    const user=await fetchJSON(`${process.env.CMS_URL}/users/me`,{
        headers:{'Authorization': `Bearer ${jwt}`},
    })
    console.log(user)
    res.status(200).json({
        id: user.id,
        name: user.username
    })
}catch(err){
    res.status(401).end()
}
};

export default handleUser