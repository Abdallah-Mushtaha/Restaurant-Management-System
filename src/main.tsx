import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerEntry from "./pages/CustomerEntry.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MenuPage from "./pages/MenuPage.tsx";
import CartPage from "./pages/CartPage.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" dir="rtl" richColors />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/order" element={<CustomerEntry />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="*" element={<App />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>,
);
