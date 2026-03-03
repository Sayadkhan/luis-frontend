"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@/providers/ThemeProvider";
import {
  useChangeYourPasswordMutation,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import {
  useRequestEmailChangeMutation,
  useVerifyEmailChangeMutation,
} from "@/redux/features/user/userApi";
import {
  Shield,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Security: React.FC = () => {
  const { theme } = useTheme();
  const [changePassword, { isLoading: isPasswordLoading }] =
    useChangeYourPasswordMutation();
  const [requestEmailChange, { isLoading: isEmailRequestLoading }] =
    useRequestEmailChangeMutation();
  const [verifyEmailChange, { isLoading: isEmailVerifyLoading }] =
    useVerifyEmailChangeMutation();

  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const [emailStep, setEmailStep] = useState<"request" | "verify">("request");
  const [pendingEmail, setPendingEmail] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  const route = useRouter();

  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    reset: resetEmail,
    formState: { errors: emailErrors },
  } = useForm({
    defaultValues: {
      newEmail: "",
      currentPassword: "",
      code: "",
    },
  });

  const onPassSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      alert("Password changed successfully!");
      resetPass();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to change password");
    }
  };

  const onEmailRequestSubmit = async (data: any) => {
    try {
      await requestEmailChange({
        newEmail: data.newEmail,
        currentPassword: data.currentPassword,
      }).unwrap();
      setPendingEmail(data.newEmail);
      setEmailStep("verify");
      alert("Verification code sent to your previous email!");
    } catch (err: any) {
      alert(err.data?.message || "Failed to request email change");
    }
  };

  const onEmailVerifySubmit = async (data: any) => {
    try {
      await verifyEmailChange({ code: data.code }).unwrap();
      alert("Email updated successfully! Please login with your new email.");
      setEmailStep("request");
      resetEmail();
      await logoutMutation(undefined).unwrap();
      dispatch(logout());
      route.push("/login");
      toast.success("Logged out successfully (session cleared)");
    } catch (err: any) {
      alert(err.data?.message || "Invalid or expired code");
    }
  };

  const themeClasses = {
    bgCard: theme === "light" ? "bg-white" : "bg-gray-800",
    textPrimary: theme === "light" ? "text-gray-800" : "text-gray-100",
    textMuted: theme === "light" ? "text-gray-500" : "text-gray-400",
    border: theme === "light" ? "border-gray-200" : "border-gray-700",
    input:
      theme === "light"
        ? "bg-white border-gray-300 text-gray-900"
        : "bg-gray-700 border-gray-600 text-gray-100",
    btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    btnSecondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold ${themeClasses.textPrimary} flex items-center gap-2`}
        >
          <Shield className="w-8 h-8 text-blue-500" />
          Security Settings
        </h1>
        <p className={`${themeClasses.textMuted} mt-1`}>
          Manage your account's security and authentication
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* CHANGE PASSWORD */}
        <div
          className={`${themeClasses.bgCard} p-6 rounded-2xl shadow-lg border ${themeClasses.border}`}
        >
          <h2
            className={`text-xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-2`}
          >
            <Lock className="w-5 h-5 text-blue-500" />
            Change Password
          </h2>
          <form onSubmit={handlePassSubmit(onPassSubmit)} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}
              >
                Current Password
              </label>
              <input
                {...registerPass("oldPassword", {
                  required: "Current password is required",
                })}
                type="password"
                className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:ring-2 focus:ring-blue-500 outline-none`}
                placeholder="••••••••"
              />
              {passErrors.oldPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passErrors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}
                >
                  New Password
                </label>
                <input
                  {...registerPass("newPassword", {
                    required: "New password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  type="password"
                  className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:ring-2 focus:ring-blue-500 outline-none`}
                  placeholder="••••••••"
                />
                {passErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passErrors.newPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}
                >
                  Confirm New Password
                </label>
                <input
                  {...registerPass("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  type="password"
                  className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:ring-2 focus:ring-blue-500 outline-none`}
                  placeholder="••••••••"
                />
                {passErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passErrors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isPasswordLoading}
              className={`w-full py-3 rounded-xl font-bold ${themeClasses.btnPrimary} transition flex items-center justify-center gap-2`}
            >
              {isPasswordLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>

        {/* CHANGE EMAIL */}
        <div
          className={`${themeClasses.bgCard} p-6 rounded-2xl shadow-lg border ${themeClasses.border}`}
        >
          <h2
            className={`text-xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-2`}
          >
            <Mail className="w-5 h-5 text-blue-500" />
            Change Email Address
          </h2>

          {emailStep === "request" ? (
            <form
              onSubmit={handleEmailSubmit(onEmailRequestSubmit)}
              className="space-y-4"
            >
              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}
                >
                  New Email Address
                </label>
                <input
                  {...registerEmail("newEmail", {
                    required: "New email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:ring-2 focus:ring-blue-500 outline-none`}
                  placeholder="new-email@example.com"
                />
                {emailErrors.newEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailErrors.newEmail.message}
                  </p>
                )}
              </div>

              {/* 🔐 NEW PASSWORD CONFIRMATION FIELD */}
              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}
                >
                  Confirm Current Password
                </label>
                <input
                  {...registerEmail("currentPassword", {
                    required: "Current password is required",
                  })}
                  type="password"
                  className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:ring-2 focus:ring-blue-500 outline-none`}
                  placeholder="••••••••"
                />
                {emailErrors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailErrors.currentPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isEmailRequestLoading}
                className={`w-full py-3 rounded-xl font-bold ${themeClasses.btnPrimary} transition flex items-center justify-center gap-2`}
              >
                {isEmailRequestLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  "Request Verification Code"
                )}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleEmailSubmit(onEmailVerifySubmit)}
              className="space-y-4"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-800 mb-4">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  We've sent a 6-digit verification code to{" "}
                  <b>{(user as any)?.email}</b>. Please enter it below to
                  confirm your new email.
                </p>
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}
                >
                  Verification Code (6-Digits)
                </label>
                <input
                  {...registerEmail("code", {
                    required: "Verification code is required",
                    minLength: { value: 6, message: "6 digits required" },
                  })}
                  type="text"
                  maxLength={6}
                  className={`w-full p-3 rounded-xl border ${themeClasses.input} text-center text-2xl tracking-[1em] font-bold focus:ring-2 focus:ring-blue-500 outline-none`}
                  placeholder="000000"
                />
                {emailErrors.code && (
                  <p className="text-red-500 text-xs mt-1 text-center">
                    {emailErrors.code.message}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEmailStep("request")}
                  className={`flex-1 py-3 rounded-xl font-bold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:opacity-80 transition`}
                  disabled={isEmailVerifyLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEmailVerifyLoading}
                  className={`flex-[2] py-3 rounded-xl font-bold ${themeClasses.btnPrimary} transition flex items-center justify-center gap-2`}
                >
                  {isEmailVerifyLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    "Verify & Update Email"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;
