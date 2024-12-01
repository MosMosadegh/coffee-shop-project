import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import connectToDb from "@/configs/db";


export async function GET() {
    connectToDb(); 

    const token = cookies().get("token"); 
    let user = null;

    if (token) {
        const tokenPayload = verifyAccessToken(token.value);
        if (tokenPayload) {
            user = await UserModel.findOne({ email: tokenPayload.email }, "-password -refreshToken -__V").lean()
        }
        return Response.json(user) ;  
    } else {
        return Response.json({
            data: null,
            message: "Not Access !!"
        },{status: 401})
    }

}