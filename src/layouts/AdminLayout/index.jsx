import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Sidebar from "./Sidebar";

import * as S from "./styles";
import { ROUTES } from "constants/routes";

function AdminLayout() {
  const { isShowAdminSidebar } = useSelector((state) => state.common);
  console.log(
    "🚀 ~ file: index.jsx:15 ~ AdminLayout ~ isShowAdminSidebar:",
    isShowAdminSidebar
  );
  const { userInfo } = useSelector((state) => state.auth);

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && userInfo.loading) {
    return <div>Loading...</div>;
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  return (
    <S.AppWrapper>
      <Header />
      <S.AppContainer>
        <Sidebar />
        <S.AppContent isShowAdminSidebar={isShowAdminSidebar}>
          <Outlet />
        </S.AppContent>
      </S.AppContainer>
    </S.AppWrapper>
  );
}

export default AdminLayout;
