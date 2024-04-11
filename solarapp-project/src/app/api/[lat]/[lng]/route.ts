import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  let params = request.nextUrl.pathname
    .substring(1, request.nextUrl.pathname.length)
    .split("/");

  let insights = await (
    await fetch(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${params[1]}&location.longitude=${params[2]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    )
  ).json();

  return new Response(JSON.stringify(insights));
}
