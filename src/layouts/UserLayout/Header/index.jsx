import { Dropdown } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <div>Logo</div>
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
          <div>User</div>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
