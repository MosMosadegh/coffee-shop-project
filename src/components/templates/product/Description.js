import React from "react";

const Description = ({product}) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <h3>10 عددی (SETpresso ( GOLD</h3>
      <p>( South and Central America and Africa ( 100% ARABICA</p>
      <p>( NESPRESSO COMPATIBLE COFFEE CAPSULE ( GOLD</p>
      <p>
        {product.shortDescription}
      </p>
      <p>
        {product.longDescription}
      </p>
    </div>
  );
};

export default Description;
