import { cookies } from "next/headers";

export function POST() {
  cookies().delete("token");

  return Response.json({message: "Logout is done"});
}
