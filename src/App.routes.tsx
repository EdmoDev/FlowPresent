import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && (
          <Route path="/tempobook/*" element={<div />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
