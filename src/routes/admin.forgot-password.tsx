import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        toast.error(error.message || "Failed to send reset email");
      } else {
        setEmailSent(true);
        toast.success("Password reset email sent! Check your inbox.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-charcoal mb-2">Check Your Email</h1>
              <p className="text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-sm text-amber-800">
                  <strong>Next steps:</strong>
                </p>
                <ol className="text-sm text-amber-700 mt-2 space-y-1 list-decimal list-inside">
                  <li>Check your email inbox</li>
                  <li>Click the reset link in the email</li>
                  <li>Enter your new password</li>
                </ol>
              </div>

              <p className="text-sm text-gray-600 text-center">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-green hover:underline"
                >
                  try again
                </button>
              </p>

              <div className="pt-4 border-t">
                <Link
                  to="/admin/login"
                  className="block text-center text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal">
              <span className="brand">frisco</span>
              <span className="brand-tech">ntech</span>
            </h1>
            <p className="text-gray-600 mt-2">Reset Your Password</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green focus:border-transparent"
                placeholder="admin@friscontech.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green text-white py-3 rounded-md font-semibold hover:bg-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/admin/login"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to login
            </Link>
            <a href="/" className="block text-sm text-gray-600 hover:text-gray-900">
              Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
