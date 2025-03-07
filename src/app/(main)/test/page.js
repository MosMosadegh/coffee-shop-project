import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <Breadcrumb route={"test"} />
      <div className="container h-[1000px] flex flex-col justify-center items-center bg-black text-white ">
        <div className="relative w-[400px] h-auto  z-[0]">
          <div className="absolute h-60 w-60 top-[-100px] left-[-100px] bg-gradient-to-tr bg-cyan-600 rounded-full z-[-1]"></div>
          <div className="absolute h-60 w-60 bottom-[-100px] right-[-100px] bg-rose-500 rounded-full z-[-1]"></div>
          <div className="">
            <form className="py-12 px-9 bg-white/10 border-2 border-slate-700 rounded-xl backdrop-blur-sm shadow-lg shadow-gray-900">
              <h1 className="text-3xl text-center mb-7">Login Here</h1>
              <div className="flex flex-col ">
                <label className="text-base">User Name</label>
                <input
                  type="text"
                  placeholder="email or phone"
                  className="bg-slate-500 mt-2 h-12 block border-none outline-none px-3 font-light rounded-md"
                />
              </div>
              <div className="flex flex-col mt-7">
                <label className="text-base">Password</label>
                <input
                  type="text"
                  placeholder="password"
                  className="bg-slate-500 mt-2 h-12 block px-3 font-light rounded-md"
                />
              </div>
              <button
                type="submit"
                className="mt-10 py-4 bg-white block w-full border-2 rounded-md text-black text-xl "
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="mt-20 flex gap-24">
          <div>
            <Link
              href="/shop"
              className="relative group group-hover:text-orange-300 transition-colors"
            >
              فروشگاه
              <div className="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible w-52 p-6 space-y-4 text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t-[3px] border-t-orange-300 tracking-normal shadow-normal  child:inline-block transition-all delay-75 child-hover:text-orange-300 ">
                <a href="#">قهوه ویژه</a>
                <a href="#">ویژه در سطح جهانی</a>
                <a href="#">قهوه درجه یک</a>
                <a href="#">ترکیبات تجاری</a>
                <a href="#">کپسول قهوه</a>
                <a href="#">قهوه زینو برزیلی</a>
              </div>
            </Link>
          </div>
          <div className="relative group transition-colors">
            <button className="bg-blue-600 hover:bg-blue-800 transition-colors flex justify-center items-center w-44 p-3 border-2 rounded-md border-none outline-none gap-6 ">
              User Profile
              <span className="group-hover:transform group-hover:rotate-180">🔼</span>
             
            </button>
              <div className="w-44 bg-slate-100 absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible child:block text-black shadow-lg shadow-slate-500 p-4  child:p-2 group-hover:transition-all delay-75  translate-y-2 child-hover:text-sky-800 text-center rounded-md ">
                <a href="">Next</a>
                <a href="">React</a>
                <a href="">Redux</a>
                <a href="">HTML</a>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
