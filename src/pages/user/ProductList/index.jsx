import { useState, useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Checkbox,
  Flex,
  Button,
  Input,
  Select,
  Breadcrumb,
  Space,
  Rate,
} from "antd";
import {
  PhoneOutlined,
  DownOutlined,
  LaptopOutlined,
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";
import { getTypeListRequest } from "../../../redux/slicers/type.slice";
import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";

import * as S from "./styles";

function ProductListPage() {
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

  const navigate = useNavigate();

  const [isShowCB, setIsShowCB] = useState(false);
  const [isShowCBLT, setIsShowCBLT] = useState(false);

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { typeList } = useSelector((state) => state.type);
  const { reviewList } = useSelector((state) => state.review);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListRequest());
    dispatch(getTypeListRequest());
  }, []);

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [searchParams]);

  const handleFilter = (key, value) => {
    const newFilterParams = { ...searchParams, [key]: value };
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`);
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };
  const productRate = useMemo(() => {
    const totalRate = reviewList.data.reduce(
      (total, item) => total + item.rate,
      0
    );
    return reviewList.data.length ? totalRate / reviewList.data.length : 0;
  }, [reviewList.data]);

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
            <Card
              size="small"
              style={{
                width: 230,
                height: 300,
                position: "relative",
                overflow: "hidden",
              }}
              cover={<S.CartImg alt="example" src={item.image} />}
            >
              <S.DivWrapper>
                <h3>{item.name}</h3>
                <h4>Hãng: {item.category.name}</h4>
                <h4>Giá: {item.price.toLocaleString()} VND</h4>
                <Rate value={productRate} allowHalf disabled />
              </S.DivWrapper>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
        ]}
      />
      <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Danh sách sản phẩm" size="small">
            <S.DeviceWrapper>
              <S.DevicePhoneWrappe
                onClick={() => {
                  setIsShowCB(!isShowCB);
                }}
              >
                <Space
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ color: "#0a0a0a" }}>
                    <AppstoreOutlined />
                    Hãng
                  </div>
                  <DownOutlined />
                </Space>
              </S.DevicePhoneWrappe>
              {isShowCB && (
                <S.CheckBoxWrapper>
                  <Checkbox.Group
                    style={{
                      display: "flex",
                      flexDirection: "Column",
                    }}
                    onChange={(values) => handleFilter("categoryId", values)}
                    value={searchParams.categoryId}
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
                <Space
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ color: "#0a0a0a" }}>
                    <ShopOutlined />
                    Loại thiết bị
                  </div>
                  <DownOutlined />
                </Space>
              </S.DevicePhoneWrappe>
              {isShowCBLT && (
                <S.CheckBoxWrapper>
                  <Checkbox.Group
                    style={{
                      display: "flex",
                      flexDirection: "Column",
                    }}
                    onChange={(values) => handleFilter("typeId", values)}
                    value={searchParams.typeId}
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
              {/* <Input
                style={{ borderRadius: 15 }}
                onChange={(e) => handleFilter("keyword", e.target.value)}
                value={searchParams.keyword}
                placeholder="Gõ từ khoá tìm kiếm"
              /> */}
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => handleFilter("priceOrder", value)}
                value={searchParams.priceOrder}
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
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
