import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import AdminLayout from "layouts/AdminLayout";
import UserLayout from "layouts/UserLayout";

import HomePage from "pages/user/Home";
import AboutPage from "pages/user/About";
import ProductDetailPage from "pages/user/ProductDetail";
import ToDoListPage from "pages/user/ToDoList";

import DashboardPage from "pages/admin/Dashboard";
import ProductManagePage from "pages/admin/ProductManage";
import CreateProductPage from "pages/admin/CreateProduct";

import NotFoundPage from "pages/NotFound";

import { ROUTES } from "constants/routes";

export const AppContext = createContext(null);

function App() {
  const [text, setText] = useState("ahihi");
  return (
    <AppContext.Provider value={{ text: text }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f18585",
            borderRadius: 0,
          },
        }}
      >
        <Routes>
          <Route element={<UserLayout />}>
            <Route path={ROUTES.USER.HOME} element={<HomePage />} />
            <Route
              path={ROUTES.USER.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />
            <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
            <Route
              path={ROUTES.USER.TO_DO_LIST}
              element={<ToDoListPage text={text} setText={setText} />}
            />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
            <Route
              path={ROUTES.ADMIN.PRODUCT_MANAGE}
              element={<ProductManagePage />}
            />
            <Route
              path={ROUTES.ADMIN.CREATE_PRODUCT}
              element={<CreateProductPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ConfigProvider>
    </AppContext.Provider>
  );
}

export default App;
