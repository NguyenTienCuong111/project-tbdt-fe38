import { Dropdown } from "antd";

import { UserOutlined } from "@ant-design/icons";

import { useMemo, useState } from "react";
import { Input } from "antd";

import { Link, useLocation, useNavigate } from "react-router-dom";

import qs from "qs";
import { ROUTES } from "constants/routes";

import * as S from "./styles";

function Header() {
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
        />
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
          <span>
            Tiến Cường
            <UserOutlined style={{ marginLeft: 10 }} />
          </span>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
