import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { FormEvent, useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const COOLDOWN_HOURS = 2;
const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;
const STORAGE_KEY = "admin_login_attempts";

interface LoginAttempts {
  count: number;
  lockoutUntil: number | null;
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Load and check rate limit on mount
  useEffect(() => {
    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAttempts = (): LoginAttempts => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { count: 0, lockoutUntil: null };
    }
    return JSON.parse(stored);
  };

  const saveAttempts = (attempts: LoginAttempts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  };

  const checkRateLimit = () => {
    const attempts = getAttempts();
    const now = Date.now();

    if (attempts.lockoutUntil && now < attempts.lockoutUntil) {
      setIsLocked(true);
      const remaining = attempts.lockoutUntil - now;
      const hours = Math.floor(remaining / (60 * 60 * 1000));
      const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
    } else if (attempts.lockoutUntil && now >= attempts.lockoutUntil) {
      // Cooldown expired, reset attempts
      saveAttempts({ count: 0, lockoutUntil: null });
      setIsLocked(false);
      setRemainingTime("");
    } else {
      setIsLocked(false);
      setRemainingTime("");
    }
  };

  const recordFailedAttempt = () => {
    const attempts = getAttempts();
    const newCount = attempts.count + 1;

    if (newCount >= MAX_ATTEMPTS) {
      const lockoutUntil = Date.now() + COOLDOWN_MS;
      saveAttempts({ count: newCount, lockoutUntil });
      setIsLocked(true);
      toast.error(
        `Too many failed attempts. Account locked for ${COOLDOWN_HOURS} hours.`,
        { duration: 5000 }
      );
    } else {
      saveAttempts({ count: newCount, lockoutUntil: null });
      const remaining = MAX_ATTEMPTS - newCount;
      toast.error(
        `Invalid email or password. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`
      );
    }
  };

  const resetAttempts = () => {
    saveAttempts({ count: 0, lockoutUntil: null });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if locked
    if (isLocked) {
      toast.error(`Account is locked. Please wait ${remainingTime}.`);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        recordFailedAttempt();
      } else {
        resetAttempts();
        toast.success("Login successful");
        navigate({ to: "/admin/dashboard" });
      }
    } catch (error) {
      recordFailedAttempt();
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal">
              <span className="brand">frisco</span>
              <span className="brand-tech">ntech</span>
            </h1>
            <p className="text-gray-600 mt-2">Admin Dashboard</p>
          </div>

          {isLocked && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Account Locked</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Too many failed login attempts. Please try again in{" "}
                    <strong>{remainingTime}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLocked}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="admin@friscontech.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLocked}
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-green focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full bg-green text-white py-3 rounded-md font-semibold hover:bg-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/admin/forgot-password"
              className="block text-sm text-green hover:text-green/80 font-medium"
            >
              Forgot your password?
            </Link>
            <a href="/" className="block text-sm text-gray-600 hover:text-gray-900">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
