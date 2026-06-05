import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import { useUser } from "@clerk/react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProblemsPage from "./pages/ProblemsPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn } = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;

//Tailwind, Daisyui, react-router, react-hot-toast,
//todo: react-query aka tanstack query, axios
