import { Navigate } from "react-router";

import { appConfig } from "../../app/app-config";
import coverImage from "../../assets/banners/4.png";
import { GoogleButton } from "../../common/components/button/google-button";
import { CoverLayout } from "../../common/components/layout/cover-layout";
import { LoadingPageState } from "../../common/components/layout/loading-page-state";
import { useAuthContext } from "../../context/context";
import { AuthenticationMethod } from "./types";

export function LoginPage() {
  const { isAuthenticated, login } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated === null) {
    return <LoadingPageState />;
  }

  const handleLogin = () => login(AuthenticationMethod.Google);

  return (
    <CoverLayout coverImage={coverImage}>
      <div className="max-w-lg w-full p-4">
        <img className=" my-16" src={appConfig.logo.svgWhite} alt="OMA Logo" />
        <div className="flex items-center flex-col">
          <h2 className=" text-3xl mb-5">Sing in</h2>
          <GoogleButton onClick={handleLogin}>Login with Google</GoogleButton>
        </div>
      </div>
    </CoverLayout>
  );
}
