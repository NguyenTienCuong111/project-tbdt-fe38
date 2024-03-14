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
  Tag,
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
import styled from "styled-components";
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import Slider from "react-slick";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";
import { getTypeListRequest } from "../../../redux/slicers/type.slice";
import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";

import * as S from "./styles";

function ProductListPage() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
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

  const [isShowCB, setIsShowCB] = useState(true);
  const [isShowCBLT, setIsShowCBLT] = useState(true);

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
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "solid 0px #ccc",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              cover={<S.CartImg alt="example" src={item.image} />}
            >
              <S.DivWrapper>
                <S.ProductTitle>{item.name}</S.ProductTitle>
                <Tag color="gold">{item.category.name}</Tag>
                <Tag color="#f50">{item.price.toLocaleString()} ₫</Tag>
                <Rate style={{ marginTop: 10 }} value={5} allowHalf disabled />
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
        style={{ marginLeft: 105 }}
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
          {
            title: "Danh sách sản phẩm",
          },
        ]}
      />
      <div
        id="slider-container"
        style={{
          backgroundColor: "#efefef",
          padding: "0 30px",
          marginTop: 20,
          border: "none",
          borderRadius: "10px",
        }}
      >
        <Slider {...settings}>
          <div>
            <div style={{ padding: "10px 5px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/banner_collec_2.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: "10px 5px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/banner_collec_3.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: "10px 5px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/banner_collec_1.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
        </Slider>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#fffb87",
          padding: "0 30px",
          marginTop: 20,
          border: "none",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <S.ItemBlogBlock>Công nghệ 24h</S.ItemBlogBlock>
        <S.ItemBlogBlock>Khuyến mãi</S.ItemBlogBlock>
      </div>
      <S.ProductListContainer>
        <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
          <Col xs={24} md={6} style={{ padding: "10px 20px" }} span={6}>
            <Card title="Bộ lọc" size="small">
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
                      Thương hiệu
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
          <Col span={18}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col style={{ padding: "10px 20px" }} span={16}>
                {/* <Input
                style={{ borderRadius: 15 }}
                onChange={(e) => handleFilter("keyword", e.target.value)}
                value={searchParams.keyword}
                placeholder="Gõ từ khoá tìm kiếm"
              /> */}
              </Col>
              <Col style={{ padding: "10px 20px" }} span={8}>
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
            <Row style={{ padding: "10px 10px" }} gutter={[16, 16]}>
              {renderProductItems}
            </Row>
            {productList.data.length < productList.meta.total && (
              <Flex justify="center" style={{ marginTop: 16 }}>
                <Button onClick={() => handleShowMore()}>Hiển thị thêm</Button>
              </Flex>
            )}
            <div style={{ marginTop: 20, fontSize: "16px" }}>
              <h2 style={{ fontSize: "20px" }}>
                {" "}
                Hệ thống cửa hàng MONA Computer{" "}
              </h2>
              <p style={{ marginTop: 20 }}>
                - Mua bán các dòng điện thoại IPhone chính hãng mới và cũ like
                new
              </p>
              <p style={{ marginTop: 20 }}>
                - Cam kết hàng chính hãng, zin Apple
              </p>
              <p style={{ marginTop: 20 }}>
                - Bảo hành 6 tháng, Bao đổi trả 30 ngày
              </p>
              <p style={{ marginTop: 20 }}> - Uy tín, tận tâm chu đáo</p>
            </div>
            <div style={{ height: 100 }}></div>
          </Col>
        </Row>
      </S.ProductListContainer>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
