import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setError(""); // clear error when user types
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (pwd) => {
    // 1 upper case, 1 special character, min length 6
    const minLength = pwd.length >= 6;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    if (!minLength) return "Password must be at least 6 characters long.";
    if (!hasUpper) return "Password must contain at least one uppercase letter.";
    if (!hasSpecial) return "Password must contain at least one special character.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const pwdError = validatePassword(form.password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(form);
      // We no longer auto-login. We just alert and redirect to login page.
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join RateGuard to start protecting your APIs in minutes."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Name</label>
          <Input 
            type="text" 
            name="name" 
            placeholder="John Doe" 
            onChange={handleChange} 
            autoComplete="name"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email address</label>
          <Input 
            type="email" 
            name="email" 
            placeholder="name@company.com" 
            onChange={handleChange} 
            autoComplete="email"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Create a strong password" 
              onChange={handleChange} 
              autoComplete="new-password"
              className="pr-10"
              required 
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1.5">
            Minimum 6 characters, at least 1 uppercase letter, and 1 special character.
          </p>
        </div>

        {error && (
          <p className="text-sm font-medium text-red-500 mt-2">{error}</p>
        )}

        <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-[var(--text-secondary)] text-sm">
        Already have an account?
        <Link to="/login" className="text-[var(--brand-primary)] hover:text-[var(--brand-hover)] font-medium ml-1.5 transition-colors">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;