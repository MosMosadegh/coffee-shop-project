import React from "react";

const MoreInfoes = ({product}) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div className="flex justify-around">
          <p>وزن</p>
          <p>{product.weight} گرم</p>
        </div >
        <div className="flex justify-around">
          <p> مناسب برای</p>
          <p>{product.suitableFor} </p>
        </div>
        <div className="flex justify-around">
          <p>  میزان بو</p>
          <p>{product.smell} </p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
