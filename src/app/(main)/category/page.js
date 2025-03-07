import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import AllProduct from "@/components/templates/product/AllProduct";
import React from "react";

export default async function page() {
  return (
    <>
      <div className="container">
        <div className="">
          <Breadcrumb route={"فروشگاه ما"} />
          <div className="">
            <AllProduct />
          </div>
        </div>
      </div>
    </>
  );
}
