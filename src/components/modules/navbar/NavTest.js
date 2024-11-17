import React from 'react';
import Link from 'next/link';

function NavTest() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-white shadow-md py-2 px-4">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center">
          <div className="site-logo">
            <Link href="https://set-coffee.com/" className="wd-logo wd-main-logo" rel="home" aria-label="Site logo">
              <img
                width="171"
                height="53"
                src="https://set-coffee.com/wp-content/uploads/2022/06/logonew.png"
                className="max-w-[150px] h-auto"
                alt="Set Coffee Logo"
                decoding="async"
                srcSet="https://set-coffee.com/wp-content/uploads/2022/06/logonew.png 171w, https://set-coffee.com/wp-content/uploads/2022/06/logonew-150x46.png 150w"
                sizes="(max-width: 171px) 100vw, 171px"
              />
            </Link>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-grow text-center">
          <nav role="navigation" aria-label="Main navigation">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="https://set-coffee.com/" className="text-gray-700 hover:text-blue-600">صفحه اصلی</Link>
              </li>
              <li className="relative group">
                <Link href="https://set-coffee.com/set-shop/" className="text-gray-700 hover:text-blue-600">فروشگاه</Link>
                <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg mt-1">
                  <ul className="space-y-1 p-2">
                    <li>
                      <Link href="https://set-coffee.com/product-category/specialty-coffee/" className="block p-2 text-gray-700 hover:bg-gray-100">Specialty coffee</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/product-category/world-class-specialty/" className="block p-2 text-gray-700 hover:bg-gray-100">World Class Specialty</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/product-category/premium-coffee/" className="block p-2 text-gray-700 hover:bg-gray-100">Premium Coffee</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/product-category/commercial-blends/" className="block p-2 text-gray-700 hover:bg-gray-100">Commercial Coffee</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/product-category/coffee-capsule/" className="block p-2 text-gray-700 hover:bg-gray-100">Coffee Capsule</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/product-category/true-italian-passion/" className="block p-2 text-gray-700 hover:bg-gray-100">Italian Passion</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/product-category/قهوه-های-خاص-و-محدود/" className="block p-2 text-gray-700 hover:bg-gray-100">Exotic Series</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="https://set-coffee.com/product-category/فروش-سازمانی/" className="text-gray-700 hover:text-blue-600">فروش سازمانی</Link>
              </li>
              <li className="relative group">
                <Link href="#" className="text-gray-700 hover:text-blue-600">وبلاگ</Link>
                <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg mt-1">
                  <ul className="space-y-1 p-2">
                    <li>
                      <Link href="https://set-coffee.com/blog/" className="block p-2 text-gray-700 hover:bg-gray-100">دنیای قهوه</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/category/coffee-training/" className="block p-2 text-gray-700 hover:bg-gray-100">آموزش</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="https://set-coffee.com/coffee-glossary/" className="text-gray-700 hover:text-blue-600">دیکشنری قهوه</Link>
              </li>
              <li>
                <Link href="https://set-coffee.com/%d8%aa%d9%85%d8%a7%d8%b3-%d8%a8%d8%a7-%d9%85%d8%a7/" className="text-gray-700 hover:text-blue-600">تماس با ما</Link>
              </li>
              <li className="relative group">
                <Link href="https://set-coffee.com/%d8%af%d8%b1%d8%a8%d8%a7%d8%b1%d9%87-%d9%85%d8%a7/" className="text-gray-700 hover:text-blue-600">درباره ما</Link>
                <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg mt-1">
                  <ul className="space-y-1 p-2">
                    <li>
                      <Link href="https://set-coffee.com/%d8%b4%d8%b1%d8%a7%db%8c%d8%b7-%d9%82%d9%88%d8%a7%d9%86%db%8c%d9%86/" className="block p-2 text-gray-700 hover:bg-gray-100">شرایط و قوانین</Link>
                    </li>
                    <li>
                      <Link href="https://set-coffee.com/%d8%ab%d8%a8%d8%aa-%d8%b4%da%a9%d8%a7%db%8c%d8%a7%d8%aa/" className="block p-2 text-gray-700 hover:bg-gray-100">ثبت شکایات</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="https://set-coffee.com/setclub/" className="text-gray-700 hover:text-blue-600">باشگاه مشتریان</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Account Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link href="https://set-coffee.com/my-account/" className="text-gray-700 hover:text-blue-600">
              ورود / عضویت
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-1">
              <div className="p-4">
                <form method="post" className="space-y-2">
                  <input type="hidden" name="dig_nounce" className="dig_nounce" value="a9d4607829" />
                  <div>
                    <label htmlFor="username" className="block text-sm">ایمیل/شماره موبایل <span className="text-red-500">*</span></label>
                    <input type="text" name="mobile/email" id="username" className="border border-gray-300 rounded p-2 w-full" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm">گذرواژه <span className="text-red-500">*</span></label>
                    <input type="password" name="password" id="password" className="border border-gray-300 rounded p-2 w-full" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">ورود</button>
                </form>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="relative">
            <Link href="https://set-coffee.com/cart/" className="text-gray-700 hover:text-blue-600">
              سبد خرید
              <span className="bg-red-500 text-white rounded-full px-2 text-xs">0 items</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden justify-between p-4">
        <div className="site-logo">
          <Link href="https://set-coffee.com/" className="wd-logo wd-main-logo" rel="home" aria-label="Site logo">
            <img
              width="171"
              height="53"
              src="https://set-coffee.com/wp-content/uploads/2022/06/logonew.png"
              className="max-w-[150px] h-auto"
              alt="Set Coffee Logo"
              decoding="async"
              srcSet="https://set-coffee.com/wp-content/uploads/2022/06/logonew.png 171w, https://set-coffee.com/wp-content/uploads/2022/06/logonew-150x46.png 150w"
              sizes="(max-width: 171px) 100vw, 171px"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="#" className="text-gray-700 hover:text-blue-600">منو</Link>
        </div>
      </div>
    </div>
  );
}

export default NavTest;