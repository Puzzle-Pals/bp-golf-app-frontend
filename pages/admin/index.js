import dynamic from "next/dynamic";
import Head from "next/head";
import AdminLogin from "../../components/AdminLogin";
import { adminApi } from "../../utils/api";
import { useState, useEffect } from "react";

// Dynamically import the dashboard page as a component
const AdminDashboard = dynamic(() => import("./dashboard"), { ssr: false });

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
        <AdminDashboard />
      ) : (
        <AdminLogin setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}