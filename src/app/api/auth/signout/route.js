import { cookies } from "next/headers";

export function POST() {
  cookies().delete("token");
  cookies().delete("refreshToken");
  cookies().delete("next-auth.session-token");
  cookies().delete("next-auth.csrf-token");
  cookies().delete("next-auth.callback-url");

  return Response.json({message: "Logout is done"});
}
