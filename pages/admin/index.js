import { useState, useEffect } from "react";
import Head from "next/head";
import AdminLogin from "../../components/AdminLogin";
import AdminDashboard from "../../components/AdminDashboard";
import { adminApi } from "../../utils/api";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const data = await adminApi("checkLogin");
        setIsLoggedIn(!!data.isLoggedIn);
      } catch (error) {
        console.error("Login status check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Head>
          <title>Admin | BP Golf Association</title>
        </Head>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin | BP Golf Association</title>
      </Head>
      
      {isLoggedIn ? (
        <AdminDashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AdminLogin setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}