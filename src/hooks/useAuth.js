import { useEffect } from "react";
import { useSession } from "next-auth/react";

const useAuth = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (session?.refreshToken) {
        try {
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: session.refreshToken }),
          });

          if (response.ok) {
            const { newAccessToken } = await response.json();
            await update({ accessToken: newAccessToken });
          } else {
            console.error("Failed to refresh access token");
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }
      }
    };

    if (session?.accessToken) {
      // بررسی انقضای accessToken
      const tokenExpiration = JSON.parse(atob(session.accessToken.split(".")[1])?.exp);
      if (tokenExpiration && tokenExpiration * 1000 < Date.now()) {
        refreshAccessToken();
      }
    }
  }, [session]);

  return session;
};

export default useAuth;