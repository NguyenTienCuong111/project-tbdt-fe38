import { Dropdown, Space, Badge, Button } from "antd";

import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { useMemo, useState } from "react";
import { Input } from "antd";

import { Link, useLocation, useNavigate } from "react-router-dom";

import qs from "qs";
import { ROUTES } from "constants/routes";
import { logoutRequest } from "../../../redux/slicers/auth.slice";

import * as S from "./styles";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const { search } = useLocation();
  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    return {
      categoryId: params.categoryId
        ? params.categoryId.map((item) => parseInt(item))
        : [],
      typeId: params.typeId ? params.typeId.map((item) => parseInt(item)) : [],
      priceOrder: params.priceOrder,
      keyword: params.keyword || "",
    };
  }, [search]);
  const [searchQuery, setSearchQuery] = useState(searchParams.keyword);

  const navigate = useNavigate();

  const handleFilter = (key, value) => {
    const newFilterParams = { ...searchParams, [key]: value };
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Perform the filter action when Enter key is pressed
      handleFilter("keyword", searchQuery);
    }
  };
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderLogo>
          <Link to={ROUTES.USER.HOME}>
            <img
              style={{ width: 150, height: 100 }}
              src="http://mauweb.monamedia.net/hanoicomputer/wp-content/uploads/2019/06/logo-final.png"
              alt="logo"
            />
          </Link>
        </S.HeaderLogo>
        <Input
          style={{ width: "500px", borderRadius: 15 }}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchQuery}
          placeholder="Gõ từ khoá tìm kiếm"
          allowClear
        />

        {userInfo.data.id ? (
          <Space>
            <Link to={ROUTES.USER.CART}>
              <Badge count={cartList.length}>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, color: "#414141" }}
                />
              </Badge>
            </Link>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: "Dashboard",
                    icon: <UserOutlined />,
                    onClick: () => navigate(ROUTES.ADMIN.DASHBOARD),
                    style: {
                      display:
                        userInfo.data.role === "admin" ? "block" : "none",
                    },
                  },
                  {
                    key: "2",
                    label: "Thông tin cá nhân",
                    icon: <UserOutlined />,
                    onClick: () => navigate(ROUTES.USER.PROFILE),
                  },
                  {
                    key: "3",
                    label: "Đăng xuất",
                    onClick: () => dispatch(logoutRequest()),
                    icon: <LogoutOutlined />,
                  },
                ],
              }}
            >
              <span>
                {userInfo.data.fullName}
                <UserOutlined style={{ marginLeft: 10 }} />
              </span>
            </Dropdown>
          </Space>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
        )}
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
