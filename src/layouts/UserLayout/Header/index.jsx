import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderLogo>
          <img
            style={{ width: 150, height: 100 }}
            src="http://mauweb.monamedia.net/hanoicomputer/wp-content/uploads/2019/06/logo-final.png"
            alt="logo"
          />
        </S.HeaderLogo>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: <Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>,
              },
              {
                key: "2",
                label: "My profile",
              },
              {
                key: "3",
                label: "Logout",
              },
            ],
          }}
        >
          <UserOutlined>User</UserOutlined>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
