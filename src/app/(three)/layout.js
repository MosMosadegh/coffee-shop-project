import { AuthProvider } from "@/context/AuthContext";

export default function ThreeLayout({ children }) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
