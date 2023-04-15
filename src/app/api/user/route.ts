import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json()

  try {
    let continuation = ""
    const userTokens: any = []
    do {
      const url = `https://api.reservoir.tools/users/${query.address}/tokens/v7` + (continuation ? `?continuation=${continuation}` : "")
      console.log(url)
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
          'Access-Control-Allow-Origin': '*'
        },
      })
      const data: any = await res.json()
      userTokens.push(...data.tokens)
      console.log()
      continuation = data.continuation
    } while (continuation)
    console.log(userTokens);
    return NextResponse.json({ tokens: userTokens })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}