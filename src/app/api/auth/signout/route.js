import { cookies } from "next/headers";

export function POST() {
  cookies().delete("token");
  cookies().delete("refresh-token");

  return Response.json({message: "Logout is done"});
}
