import React from 'react'
import Navbar from './Navbar'
import { authUser } from '@/utils/isLogin';

export default async function NavbarWithUser() {
    const user = await authUser();
    console.log("🚀 ~ RootLayout ~ user:", user);
    const userData = user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : null;
  return (
    <div>
        <Navbar user={userData}/>
    </div>
  )
}
