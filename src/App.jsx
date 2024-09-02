import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Suspense } from "react";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import NotFoundPage from "./pages/NotFoundPage";
const MyProfile = lazy(() => import("./pages/MyProfilePage"));
const MyUploads = lazy(() => import("./pages/MyUploads"));
const UploadImage = lazy(() => import("./pages/UploadImage"));
function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="upload" element={<UploadImage />} />
            <Route path="my-uploads" element={<MyUploads />} />
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
