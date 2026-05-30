import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

// ==========================================
// LOGIN PAGE
// This is where users enter their email and password to access the dashboard.
// It handles showing errors, toggling password visibility, and talking to the backend.
// ==========================================

function LoginPage() {
  const navigate = useNavigate(); // Used to redirect the user to a new page after they log in
  const { login } = useContext(AuthContext); // Get the login function from our global AuthContext

  // 1. Form State: This keeps track of what the user is typing in the input boxes
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  
  // 2. UI State: Keeps track of errors, loading spinners, and the "show password" toggle
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 3. Handle Change: Runs every time the user presses a key in an input box
  const handleChange = (e) => {
    setError(""); // Clear any old red error messages as soon as they start typing
    setForm({
      ...form, // Keep all the existing form data
      [e.target.name]: e.target.value // Update the specific box they are typing in (email or password)
    });
  };

  // 4. Handle Submit: Runs when they click the "Sign In" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing the entire page like it normally does for forms
    setError("");
    setLoading(true); // Turn on the loading spinner so they know it's working
    
    try {
      // Send the email and password to our backend API
      const data = await loginUser(form);
      
      // If it worked, save the token and user info globally
      login(data.user, data.token);
      
      // Redirect them to the main dashboard!
      navigate("/dashboard");
    } catch (err) {
      // If the backend rejected the login (wrong password, etc.), show the error message in red text
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      // Turn off the loading spinner, whether it succeeded or failed
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to manage your APIs and middleware infrastructure."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="••••••••" 
              onChange={handleChange} 
              autoComplete="current-password"
              className="pr-10"
              required 
            />
            {/* Toggle button to hide/show the password dots */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {/* If there is an error message, show it here in red */}
        {error && (
          <p className="text-sm font-medium text-red-500 mt-2">{error}</p>
        )}
        
        <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-[var(--text-secondary)] text-sm">
        Don’t have an account?
        <Link to="/register" className="text-[var(--brand-primary)] hover:text-[var(--brand-hover)] font-medium ml-1.5 transition-colors">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;