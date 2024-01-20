import { useState, useEffect, useMemo } from "react";
import { Row, Col, Card, Checkbox, Flex, Button, Input, Select } from "antd";
import { PhoneOutlined, DownOutlined, LaptopOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";
import { getTypeListRequest } from "../../../redux/slicers/type.slice";
import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";

import * as S from "./styles";

function HomePage() {
  const [isShowCB, setIsShowCB] = useState(true);
  const [isShowCBLT, setIsShowCBLT] = useState(true);
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    typeId: [],
    priceOrder: undefined,
    keyword: "",
  });

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { typeList } = useSelector((state) => state.type);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    dispatch(getCategoryListRequest());
    dispatch(getTypeListRequest());
  }, []);

  const handleFilter = (key, value) => {
    setFilterParams({ ...filterParams, [key]: value });
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: value,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  };
  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
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

  const renderTypeItems = useMemo(() => {
    return typeList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id}>
          {item.name}
        </Checkbox>
      );
    });
  }, [typeList.data]);

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card size="small" title={item.name}>
              <h4>{item.category.name}</h4>
              <h3>{item.price.toLocaleString()} VND</h3>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <S.HomeWrapper>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Danh sách sản phẩm" size="small">
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
                    onChange={(values) => handleFilter("categoryId", values)}
                  >
                    {renderCategoryItems}
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
                    onChange={(values) => handleFilter("typeId", values)}
                  >
                    {renderTypeItems}
                  </Checkbox.Group>
                </S.CheckBoxWrapper>
              )}
            </S.DeviceWrapper>
          </Card>
        </Col>
        <Col span={16}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input
                onChange={(e) => handleFilter("keyword", e.target.value)}
                placeholder="Tìm kiếm"
              />
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => handleFilter("priceOrder", value)}
                placeholder="Sắp xếp theo"
                allowClear
                style={{ width: "100%" }}
              >
                <Select.Option value="asc">Giá tăng dần</Select.Option>
                <Select.Option value="desc">Giá giảm dần</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductItems}</Row>
          {productList.data.length < productList.meta.total && (
            <Flex justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Hiển thị thêm</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </S.HomeWrapper>
  );
}

export default HomePage;
