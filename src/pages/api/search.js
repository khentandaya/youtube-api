// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { search } = JSON.parse(req.body);
  let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search ?? ""}&key=${process.env.GOOGLE_API_KEY}`);
  response = await response.json();
  res.status(200).json(response);
}
