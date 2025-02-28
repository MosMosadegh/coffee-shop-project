import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  validatePhone,
  verifyPassword,
} from "@/utils/auth/auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);

        await connectToDb();
        const { email, phone, password, code, name } = credentials;

        //Validation
        const isValidEmail = email ? validateEmail(email) : true;
        const isValidPhone = phone ? validatePhone(phone) : true;
        const isValidPassword = password ? validatePassword(password) : true;

        if (!isValidEmail && !isValidPhone) {
          throw new Error("Data is not valid");
        }

        if (email && password) {
          if (!isValidPassword) {
            throw new Error("Password is not valid");
          }
          const user = await UserModel.findOne({ email }).lean();

          console.log("🚀 ~ authorize ~ user:", user);
          if (!user) {
            throw new Error("User not found !!");
          }

          if (!user.password) {
            throw new Error(
              "This user registered with OTP. Please log in using OTP."
            );
          }

          const isCorrectPasswordWithHash = await verifyPassword(
            password,
            user.password
          );

          if (!isCorrectPasswordWithHash) {
            throw new Error("Password not valid !!");
          }
          const payload = phone ? { phone: user.phone } : { email: user.email };
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);
          await UserModel.findOneAndUpdate(payload, {
            $set: {
              refreshToken,
            },
          }).lean();

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            accessToken,
            refreshToken,
          }; // jwt payload
        }

        if (phone && code) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sms/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ phone, code, name }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to verify OTP");
          }

          const data = await response.json();
          const user = data.user;
          console.log("🚀 ~ authorize-otp ~ user:", user);

          if (!user) {
            throw new Error("User not found after OTP verification");
          }

          const payload = phone ? { phone: user.phone } : { email: user.email };
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);

          await UserModel.findOneAndUpdate(payload, {
            $set: {
              refreshToken,
            },
          }).lean();

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            accessToken,
            refreshToken,
          }; // jwt payload
        }
        throw new Error("Invalid action");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // مدت انقضای توکن JWT به ثانیه (7 روز)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      //check if accessToken is expired
      if (token.accessToken) {
        try {
          verify(token.accessToken, process.env.AccessTokenSecretKey);
        } catch (err) {
          if (err.name === "TokenExpiredError") {
            const user = await UserModel.findOne({
              refreshToken: token.refreshToken,
            }).lean();

            if (user) {
              const payload = user.phone
                ? { phone: user.phone }
                : { email: user.email };
              const newAccessToken = generateAccessToken(payload);
              token.accessToken = newAccessToken;
            }
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login-register", // مسیر صفحه ورود
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
