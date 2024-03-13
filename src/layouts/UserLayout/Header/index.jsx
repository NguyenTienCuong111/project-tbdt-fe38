import { Dropdown, Space, Badge, Button } from "antd";

import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  CreditCardOutlined,
  LaptopOutlined,
  CustomerServiceOutlined,
  ContactsOutlined,
  MobileOutlined,
  CaretDownOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { useMemo, useState } from "react";
import { Input, Row, Col } from "antd";

import { Link, useLocation, useNavigate } from "react-router-dom";

import qs from "qs";
import { ROUTES } from "constants/routes";
import { logoutRequest } from "../../../redux/slicers/auth.slice";

import * as S from "./styles";

function Header() {
  const StyledLink = styled(Link)`
    color: #393939;
    text-decoration: none;
    padding: 0px 5px;

    &:hover {
      color: red;
    }
  `;
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
              style={{ width: 150, height: 50 }}
              src="http://mauweb.monamedia.net/hanoicomputer/wp-content/uploads/2019/06/logo-final.png"
              alt="logo"
            />
          </Link>
        </S.HeaderLogo>
        <S.HeaderContainerMenu>
          <Input
            style={{ width: "400px", borderRadius: 15 }}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchQuery}
            placeholder="Gõ từ khoá tìm kiếm"
            allowClear
          />
          <S.BlogBlock>
            <StyledLink>Công nghệ 24h</StyledLink>
            <StyledLink
              style={{
               
                borderLeft: "solid black",
                
              }}
            >
              Khuyến mãi mới
            </StyledLink>
          </S.BlogBlock>
          <S.ListStore>
            Danh sách
            <br />5 cửa hàng
          </S.ListStore>

          {userInfo.data.id ? (
            <Space>
              <Link to={ROUTES.USER.CART}>
                <Badge count={cartList.length}>
                  <S.Cart>
                    <ShoppingCartOutlined
                      style={{ fontSize: 24, color: "#414141" }}
                    />
                    <S.CartInfo>cường</S.CartInfo>
                  </S.Cart>
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
                <Space>
                  <span>{userInfo.data.fullName}</span>
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                    src={userInfo.data.avatar}
                    alt=""
                  />
                </Space>
              </Dropdown>
            </Space>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
          )}
        </S.HeaderContainerMenu>
      </S.HeaderContainer>
      <S.HeaderNavigation>
        <S.HeaderNavigationUl>
          <S.HeaderNavigationLi>
            <StyledLink
              to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
                typeId: [2],
              })}`}
            >
              <MobileOutlined />
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>
                Điện thoại
              </span>
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink
              to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
                typeId: [1],
              })}`}
            >
              <LaptopOutlined />
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Laptop</span>
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink
              to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
                typeId: [3],
              })}`}
            >
              <CustomerServiceOutlined />
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Tai nghe</span>
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink>
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Ipad</span>
              <CaretDownOutlined />
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink>
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Watch</span>
              <CaretDownOutlined />
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink>
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Âm thanh</span>
              <CaretDownOutlined />
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink>
              <CameraOutlined />
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Camera</span>
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink>
              <CreditCardOutlined />
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Tin tức </span>
            </StyledLink>
          </S.HeaderNavigationLi>
          <S.HeaderNavigationLi>
            <StyledLink>
              <ContactsOutlined />
              <span style={{ paddingLeft: 5, fontSize: "16px" }}>Liên hệ</span>
            </StyledLink>
          </S.HeaderNavigationLi>
        </S.HeaderNavigationUl>
      </S.HeaderNavigation>
    </S.HeaderWrapper>
  );
}

export default Header;
