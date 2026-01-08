import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/services/admin.api";
import { useAuth } from "../context/AuthContext";
import { getMe } from "@/services/admin.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAdmin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    await loginAdmin({ email, password });
    
    const response=await getMe();

    setAdmin(response.data.admin); // <-- FIXED

    toast({
      title: "Login successful",
      description: "Welcome back, admin",
    });

    navigate("/admin", { replace: true });
    } catch (err) {
      const message =
        typeof err?.response?.data?.message === "string"
          ? err.response.data.message
          : typeof err?.message === "string"
          ? err.message
          : "Login failed";

      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Admin Login
          </h1>
          <p className="text-muted-foreground">
            Sign in to manage movie reviews
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6 bg-card p-8 rounded-lg border border-border shadow-sm"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
