import { useState, useEffect, useMemo } from "react";
import { Row, Col, Card, Checkbox, Dropdown } from "antd";
import { PhoneOutlined, DownOutlined, LaptopOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";
import { ROUTES } from "constants/routes";

import * as S from "./styles";

function HomePage() {
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const [isShowCB, setIsShowCB] = useState(true);
  const [isShowCBLT, setIsShowCBLT] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListRequest());
    dispatch(getCategoryListRequest());
  }, []);

  const handleChangeCategory = (values) => {
    dispatch(getProductListRequest({ categoryId: values }));
  };

  const renderCategoryItems = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id}>
          {item.name}
        </Checkbox>
      );
    });
  }, [categoryList.data]);

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card size="small" title={item.name}>
              {item.price.toLocaleString()} VND
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.HomeWrapper>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Bộ lọc" size="small">
            <S.DeviceWrapper>
              <S.DevicePhoneWrappe
                onClick={() => {
                  setIsShowCB(!isShowCB);
                }}
              >
                <PhoneOutlined />
                Điện thoại
                <DownOutlined style={{ marginLeft: 250 }} />
              </S.DevicePhoneWrappe>
              {isShowCB && (
                <S.CheckBoxWrapper>
                  <Checkbox.Group
                    onChange={(values) => handleChangeCategory(values)}
                  >
                    <li>{renderCategoryItems}</li>
                  </Checkbox.Group>
                </S.CheckBoxWrapper>
              )}
              <S.DevicePhoneWrappe
                onClick={() => {
                  setIsShowCBLT(!isShowCBLT);
                }}
              >
                <LaptopOutlined />
                LapTop
                <DownOutlined style={{ marginLeft: 270 }} />
              </S.DevicePhoneWrappe>
              {isShowCBLT && (
                <S.CheckBoxWrapper>
                  <Checkbox.Group
                    onChange={(values) => handleChangeCategory(values)}
                  >
                    <li>{renderCategoryItems}</li>
                  </Checkbox.Group>
                </S.CheckBoxWrapper>
              )}
            </S.DeviceWrapper>
          </Card>
        </Col>
        <Col span={16}>
          <Row gutter={[16, 16]}>{renderProductItems}</Row>
        </Col>
      </Row>
    </S.HomeWrapper>
  );
}

export default HomePage;
