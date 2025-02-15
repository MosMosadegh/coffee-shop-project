import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import AllProduct from "@/components/templates/product/AllProduct";

import React from "react";

export default async function page() {
  return (
    <div>
      <Breadcrumb route={"فروشگاه ما"} />
      <AllProduct />
      
    </div>
  );
}
