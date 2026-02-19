import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Login/useAuth";
import { toast } from "sonner";
import { ChefHat, Loader2 } from "lucide-react";

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      onLogin(user);

      const routes: Record<string, string> = {
        cashier: "/cashier",
        kitchen: "/kitchen",
        admin: "/admin",
      };

      navigate(routes[user.role] || "/");
    } else {
      toast.error("خطأ في البيانات");
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-xl"
      >
        <div className="text-center mb-8">
          <ChefHat className="w-12 h-12 text-orange-600 mx-auto mb-2" />
          <h2 className="text-2xl font-black">دخول النظام</h2>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            disabled={loading}
            className="w-full py-4 bg-orange-600 text-white font-black rounded-2xl"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
