import { Toaster } from "react-hot-toast"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import Login from "./pages/login"
import SignUp from "./pages/SignUp"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import Home from "./pages/Home"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"

const ProtectedRoute=({ children }) => {
  const { isAuthenticated, user} = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
}

const RedirecAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  console.log("User in App.jsx:", user);
  console.log("isAuthenticated in App.jsx:", isAuthenticated);
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to emerald-900 flex items-center justify-center overflow-hidden relative">
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <RedirecAuthenticatedUser>
            <SignUp />
          </RedirecAuthenticatedUser>
        } />
        <Route path="/login" element={
          <RedirecAuthenticatedUser>
            <Login />
          </RedirecAuthenticatedUser>
        } />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={
          <RedirecAuthenticatedUser>
          <ForgotPasswordPage />
          </RedirecAuthenticatedUser>
          } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
