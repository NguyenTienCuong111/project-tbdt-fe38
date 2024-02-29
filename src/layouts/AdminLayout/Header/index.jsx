import { Button, Space, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { toggleAdminSidebar } from "../../../redux/slicers/common.slice";
import { logoutRequest } from "../../../redux/slicers/auth.slice";
import * as S from "./styles";

function Header() {
  const { isShowAdminSidebar } = useSelector((state) => state.common);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Space size={24}>
          <Button
            onClick={() => dispatch(toggleAdminSidebar(!isShowAdminSidebar))}
          >
            Menu left
          </Button>
          <div>Logo</div>
        </Space>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "My profile",
              },
              {
                key: "2",
                label: "Logout",
                onClick: () => dispatch(logoutRequest()),
              },
            ],
          }}
        >
          <div>{userInfo.data.fullName}</div>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
