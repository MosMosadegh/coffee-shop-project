"use client";

import React from 'react'

export default function WishlistClient({wishlist}) {
  return (
    <div>
         <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length &&
            wishlist.map((wish) => (
              <Product
                key={wish._id}
                name={wish.product.name}
                price={wish.product.price}
                score={wish.product.score}
                productID={String(wish.product._id)}
                img={wish.product.img}
              />
            ))}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </div>
  )
}
