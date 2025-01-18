import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const CLIENT_ID =
  "816372085536-qcuqd0d3guiu0o9p126nr8jl40spme1k.apps.googleusercontent.com";

export const GoogleAuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
  );
};
