"use client";
import { useSelector } from "react-redux";
import LandingPage from "../components/root/landing-page";
import Tasks from "../components/tasks/tasks";

export default function Home() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken ? <Tasks /> : <LandingPage />;
}
