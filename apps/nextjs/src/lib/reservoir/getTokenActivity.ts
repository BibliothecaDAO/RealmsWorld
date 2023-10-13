import { NextResponse, NextRequest } from "next/server";

export const getTokenActivity = async ({ token }: { token: any }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESERVOIR_API}/tokens/${token}/activity/v4`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
                'Access-Control-Allow-Origin': '*'
            },
        });
        const data: any = await res.json()
        return data
    } catch (error) {
        return error
    }
}