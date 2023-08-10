import Providers from "@/app/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "../components/shared/header";
import "./globals.css";

export const metadata = {
  title: "Task Management System",
  description: "Task Management System Frontend Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </body>
    </html>
  );
}
