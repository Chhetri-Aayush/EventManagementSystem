import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState(
    "Verifying your email..."
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      verifyEmailToken(token);
    } else {
      setVerificationStatus("Invalid verification link.");
    }
  }, [location]);

  async function verifyEmailToken(token) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/authentication/verify-email/",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setVerificationStatus(
          "Email verified successfully! Redirecting to Log In page..."
        );
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setVerificationStatus("Email verification failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setVerificationStatus("An error occurred during email verification.");
    }
  }

  return <div>{verificationStatus}</div>;
}

export default VerifyEmail;
