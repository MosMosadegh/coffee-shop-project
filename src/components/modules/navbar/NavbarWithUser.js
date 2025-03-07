import React from "react";
import Navbar from "./Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeaderMobile from "./HeaderMobile";


export default async function NavbarWithUser() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const userData = user
    ? {
        id: user.id,
        name: user.name,
      }
    : null;
  return (
    <div>
      <Navbar user={userData} />
      <HeaderMobile user={userData} />
    </div>
  );
}
