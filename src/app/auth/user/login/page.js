"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

import "../auth-common.css";
import "./login.css";

import {
  PAGEMOVEICON,
  PASSWORDHIDEICON,
  PASSWORDVIEWICON,
} from "../../../../const-value/config-icons/page";

import { userLoginSchema } from "../../../../components/validation";

import {
  TITLE_USER_LOGIN,
  SUBTITLE_USER_LOGIN,
  LABEL_EMAIL,
  LABEL_PASSWORD,
  PH_PASSWORD,
  TEXT_SIGNIN,
  TEXT_SIGNUP,
  TEXT_FORGOT_PASSWORD,
  TEXT_NO_ACCOUNT,
  ROLE_USER,
  MSG_LOGIN_SUCCESS_USER,
  MSG_LOGIN_FAILED,
  PH_USER_EMAIL,
  MSG_GOOGLE_LOGIN_FAILED,
  MSG_GOOGLE_LOGIN_SUCCESS_USER,
} from "../../../../const-value/config-message/page";

import { loginApi, googleAuthLoginApi } from "../../../../lib/api/auth.api";

import { useLoading } from "../../../../context/LoadingContext";
import { setAuthSession } from "../../../../lib/auth";

// User login page component
export default function UserLoginPage() {
  const router = useRouter();
  const { setLoading } = useLoading();

  // Password visibility state
  const [showPass, setShowPass] = useState(false);

  // Form state management
  const [form, setForm] = useState({
    email: "",
    password: "",
    type: ROLE_USER,
  });

  /* ================= NORMAL LOGIN ================= */
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    try {
      await userLoginSchema.validate(form, { abortEarly: false });
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    setLoading(true);

    try {
      // Authenticate user credentials
      const res = await loginApi(form);

      if (!res?.status || !res?.data) {
        toast.error(res?.message || MSG_LOGIN_FAILED);
        return;
      }

      // ✅ CALL AUTH FUNCTION
      setAuthSession(res.token);

      toast.success(MSG_LOGIN_SUCCESS_USER);
      router.push("/");
    } catch (err) {
      toast.error(MSG_LOGIN_FAILED);
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = async (response) => {
    setLoading(true);

    try {
      const googleToken = response.credential;

      // Authenticate with Google
      const res = await googleAuthLoginApi({ googleToken });

      console.log("============res",res)

      if (!res?.status) {
        toast.error(MSG_GOOGLE_LOGIN_FAILED);
        return;
      }

      
      // Store session token
      setAuthSession(res.token);

      toast.success(MSG_GOOGLE_LOGIN_SUCCESS_USER);
      router.push("/");
    } catch (err) {
      toast.error(MSG_GOOGLE_LOGIN_FAILED);
    } finally {
      setLoading(false);
    }
  };

  // Switch to organizer login
  const handleCreateEvent = () => {
    try {
      setLoading(true);
      router.push("/auth/organization/login");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      {/* LEFT IMAGE */}
      <div className="auth-left d-none d-lg-flex">
        <img src="/images/auth-login.png" alt="login" />
      </div>

      {/* RIGHT FORM */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="organization-sections mt-4">
            <div className="Switch-to-Organizer" onClick={handleCreateEvent}>
              Switch to Organizer Sign In
            </div>
            <div>{PAGEMOVEICON}</div>
          </div>

          <h1 className="auth-title mt-5">{TITLE_USER_LOGIN}</h1>
          <p className="auth-sub">{SUBTITLE_USER_LOGIN}</p>

          <form onSubmit={onSubmit}>
            {/* EMAIL */}
            <label className="auth-label">{LABEL_EMAIL}</label>
            <input
              className="auth-input"
              type="email"
              placeholder={PH_USER_EMAIL}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* PASSWORD */}
            <label className="auth-label">{LABEL_PASSWORD}</label>
            <div className="auth-pass-wrap">
              <input
                className="auth-input"
                type={showPass ? "text" : "password"}
                placeholder={PH_PASSWORD}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <span
                className="auth-pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? PASSWORDVIEWICON : PASSWORDHIDEICON}
              </span>
            </div>

            {/* FORGOT */}
            <div className="login-forgot">
              <a href="/auth/forgot-password">{TEXT_FORGOT_PASSWORD}</a>
            </div>

            {/* SUBMIT */}
            <button className="auth-btn">{TEXT_SIGNIN}</button>

            {/* DIVIDER */}
            <div className="auth-divider">— Or —</div>

            {/* GOOGLE LOGIN */}
            <div className="google-wrap">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error(MSG_GOOGLE_LOGIN_FAILED)}
              />
            </div>

            {/* FOOTER */}
            <div className="auth-footer">
              {TEXT_NO_ACCOUNT} <a href="/auth/user/signup">{TEXT_SIGNUP}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
