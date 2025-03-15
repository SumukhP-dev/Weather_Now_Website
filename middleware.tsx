import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import { url } from "inspector";

export async function middleware(req: any) {
  const geoObject = geolocation(req);
  return NextResponse.next();
}
