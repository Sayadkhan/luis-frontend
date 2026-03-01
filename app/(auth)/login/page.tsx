"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { verifyToken } from "@/utils/verifyToken";
import toast from "react-hot-toast";

type TLogin = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);

  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn && (user as any)?.role === "admin") {
      router.push("/dashboard");
    }
  }, [isLoggedIn, user, router]);

  const { isLoading: getMeLoading } = useGetMeQuery(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLogin) => {
    setLoading(true);
    setError("");

    try {
      const res = await login(data).unwrap();

      if (res.success && res.data.accessToken) {
        const user = verifyToken(res.data.accessToken);
        dispatch(
          setUser({
            user,
            accessToken: res.data.accessToken,
          })
        );
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
        toast.error("Login failed.");
      }
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Something went wrong");
      toast.error(err?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (getMeLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#f7f7f7] px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
          <p className="text-gray-500 text-sm mt-1">
            Continue with your email or Google account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 rounded-md bg-white border outline-none text-gray-700 ${
                errors.email
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-gray-600"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          {/* Password + Show Hide */}
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-2 rounded-md bg-white border outline-none text-gray-700 ${
                  errors.password
                    ? "border-red-500 focus:border-red-600"
                    : "border-gray-300 focus:border-gray-600"
                }`}
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-gray-500 text-sm cursor-pointer select-none"
              >
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          {/* Remember Me + Forget Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="cursor-pointer"
              />
              <span className="text-gray-700">Remember Me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-gray-800 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gray-900 hover:bg-black text-white font-medium py-2 rounded-md transition-colors duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          disabled
          className="w-full flex justify-center items-center gap-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-all cursor-not-allowed"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 text-sm">Continue with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-gray-900 font-medium hover:underline"
          >
            Create Your Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
