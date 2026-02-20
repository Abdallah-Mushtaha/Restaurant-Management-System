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
import Login from "./pages/Login.tsx";
import KitchenDashboard from "./pages/KitchenDashboard.tsx";
import NewOrders from "./Components/KitchenDashboard/NewOrders.tsx";
import PreparingOrders from "./Components/KitchenDashboard/PreparingOrders.tsx";
import CompletedOrders from "./Components/KitchenDashboard/CompletedOrders.tsx";
import CashierDashboard from "./pages/CashierDashboard.tsx";
import SalesDashboard from "./Components/CashierDashboard/SalesDashboard.tsx";
import CashierStats from "./Components/CashierDashboard/CashierStats.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminProducts from "./Components/AdminDashboard/AdminProducts.tsx";
import AccountsPage from "./Components/AdminDashboard/AccountsPage.tsx";

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
          <Route
            path="/login"
            element={<Login onLogin={(u) => console.log(u)} />}
          />
          <Route
            path="/kitchen"
            element={
              <KitchenDashboard
                onLogout={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              />
            }
          />
          <Route path="/kitchen/new" element={<NewOrders />} />
          <Route path="/kitchen/preparing" element={<PreparingOrders />} />
          <Route path="/kitchen/completed" element={<CompletedOrders />} />
          <Route
            path="/cashier"
            element={
              <CashierDashboard
                onLogout={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              />
            }
          />
          <Route
            path="/cashier/sales"
            element={
              <SalesDashboard
                onLogout={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              />
            }
          />
          <Route
            path="/cashier/stats"
            element={
              <CashierStats
                onLogout={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              />
            }
          />
          {/* Admin Dashboard Route */}
          <Route
            path="/admin"
            element={<AdminDashboard onLogout={() => {}} />}
          />
          <Route
            path="/admin/products"
            element={<AdminProducts onLogout={() => {}} />}
          />
          <Route path="/admin/accounts" element={<AccountsPage />} />
        </Routes>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>,
);
