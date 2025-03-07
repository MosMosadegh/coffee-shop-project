import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import connectToDb from "@/configs/db";
import ProductModel from "@/models/Product";

export default async function Home() {
  await connectToDb();
  const latestProduct = await ProductModel.find({}).sort({ _id: -1 }).limit(4);

  return (
    <>
      <div className="">
        <Banner />
        <div className="container">
          <div className="w-[100%] lg:w-[95%] left-0 right-0 mx-auto">
            <Latest product={JSON.parse(JSON.stringify(latestProduct))} />
            <Promote />
            <Articles />
          </div>
        </div>
      </div>
    </>
  );
}
