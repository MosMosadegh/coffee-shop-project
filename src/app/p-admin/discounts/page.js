import Table from "@/components/templates/p-admin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import AddDiscount from "@/components/templates/p-admin/discounts/AddDiscount";

const Discounts = async () => {
  await connectToDB();
  const discounts = await DiscountModel.find({})
    .populate("user", "name")
    .populate("product", "name")
    .lean();

  return (
    <Layout>
      <main className="container">
        <AddDiscount/>

        {discounts.length === 0 ? (
          <p className="flex justify-center">کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
