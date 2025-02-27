
import { NextResponse } from "next/server";
import ProductModel from "@/models/Product";
import connectToDb from "@/configs/db";

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    await connectToDb();

    // دریافت پارامترهای `smell` و `productID` از query string
    const { searchParams } = new URL(request.url);
    const smell = searchParams.get("smell");
    const productID = searchParams.get("productID");

    // اگر پارامترهای `smell` یا `productID` وجود نداشته باشد، خطا برگردانید
    if (!smell || !productID) {
      return NextResponse.json(
        { message: "پارامترهای smell و productID الزامی هستند" },
        { status: 400 }
      );
    }

    // جستجوی محصولات مشابه بر اساس `smell` و حذف محصول فعلی
    const relatedProducts = await ProductModel.find(
      { smell: smell, _id: { $ne: productID } }, // $ne: نه برابر با productID
      "-__v" // حذف فیلد __v از نتیجه
    ).limit(8); // محدودیت تعداد محصولات مشابه


    if (relatedProducts.length === 0) {
      return NextResponse.json(
        { message: "محصول مشابهی یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error("Error in /api/product/related:", error);
    return NextResponse.json(
      { message: "خطای سرور در دریافت محصولات مشابه" },
      { status: 500 }
    );
  }
}