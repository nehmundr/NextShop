import { fetchJSON } from "@/lib/api";
import cookie from 'cookie'

async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
      return;
    }
    const { email, password } = req.body;
    const { jwt, user } = await fetchJSON(`${process.env.CMS_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password: password }),
    });
    res.status(200)
    .setHeader('Set-Cookie', cookie.serialize('jwt', jwt),{
        path:'/api',
        httpOnly:true,
    })
    .json({
      id: user.id,
      name: user.username,
    });
  } catch (err) {
    res.status(401).end();
  }
}

export default handler;
