import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import * as S from "./styles";

function UserLayout() {
  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <S.UserLayoutWrapper>
      <Header />
      <S.UserLayoutContainer>
        <Outlet />
      </S.UserLayoutContainer>
      {/* <button onClick={top} className="topbtn"></button> */}
      <div id="backtop">
        <a href="#"></a>
      </div>
      <Footer/>
    </S.UserLayoutWrapper>
  );
}

export default UserLayout;
