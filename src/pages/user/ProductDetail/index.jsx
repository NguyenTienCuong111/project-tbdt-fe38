import { useEffect, useMemo, useState } from "react";
import React from "react";
import Slider from "react-slick";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  useParams,
  Link,
  useNavigate,
  generatePath,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Space,
  Breadcrumb,
  Card,
  Button,
  InputNumber,
  Form,
  Input,
  Rate,
  Tag,
  Flex,
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  GiftOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import qs from "qs";

import { ROUTES } from "constants/routes";
import { getProductDetailRequest } from "../../../redux/slicers/product.slice";
import {
  getReviewListRequest,
  reviewProductRequest,
} from "../../../redux/slicers/review.slice";
import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from "../../../redux/slicers/favorite.slice";
import { addToCartRequest } from "../../../redux/slicers/cart.slice";
import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { PRODUCT_LIMIT1 } from "constants/paging";

import * as S from "./styles";

const ProductDetailPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [value, setValue] = useState("");
  const [reviewForm] = Form.useForm();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);

  const isFavorite = useMemo(() => {
    return productDetail.data.favorites?.some(
      (item) => item.userId === userInfo.data.id
    );
  }, [productDetail.data, userInfo.data.id]);
  const productRate = useMemo(() => {
    const totalRate = reviewList.data.reduce(
      (total, item) => total + item.rate,
      0
    );
    return reviewList.data.length ? totalRate / reviewList.data.length : 0;
  }, [reviewList.data]);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        productId: productDetail.data.id,
        name: productDetail.data.name,
        price: productDetail.data.price,
        image: productDetail.data.image,
        image1: productDetail.data.image1,
        image2: productDetail.data.image2,
        image3: productDetail.data.image3,
        quantity: quantity,
      })
    );
    notification.success({ message: "Thêm vào giỏ thành công" });
  };
  const handleToggleFavorite = () => {
    if (!userInfo.data.id)
      return notification.error({
        message: "Bạn cần đăng nhập để thực hiện tính năng này",
      });
    if (isFavorite) {
      const favoriteData = productDetail.data.favorites.find(
        (item) => item.userId === userInfo.data.id
      );
      if (favoriteData) {
        dispatch(unFavoriteProductRequest({ id: favoriteData.id }));
      }
    } else {
      dispatch(
        favoriteProductRequest({
          data: {
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          },
        })
      );
    }
  };

  const handleReviewProduct = (values) => {
    dispatch(
      reviewProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: productDetail.data.id,
        },
      })
    );
  };
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: 1,
        limit: PRODUCT_LIMIT1,
      })
    );
  }, [searchParams]);

  const renderProductItems = useMemo(() => {
    const categoryId = productDetail.data.category?.id;
    return productList.data
      .filter((item) => item.categoryId === categoryId)
      .map((item, index) => {
        return (
          <Col lg={8} md={8} sm={12} key={index}>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            >
              <Card
                size="small"
                style={{
                  width: 200,
                  height: 280,
                  position: "relative",
                  overflow: "hidden",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                }}
                cover={<S.CartImg alt="example" src={item.image} />}
              >
                <S.DivWrapper>
                  <h3>{item.name}</h3>
                  <Tag color="gold">{item.category.name}</Tag>
                  <Tag color="#f50">{item.price.toLocaleString()} ₫</Tag>
                  <Rate
                    style={{ marginTop: 10 }}
                    value={5}
                    allowHalf
                    disabled
                  />
                </S.DivWrapper>
              </Card>
            </Link>
          </Col>
        );
      });
  }, [productList.data, productDetail.data]);

  const renderReviewForm = useMemo(() => {
    if (userInfo.data.id) {
      const isReviewed = reviewList.data.some(
        (item) => item.userId === userInfo.data.id
      );
      if (isReviewed) {
        return (
          <S.ReviewFormWrapper>
            Bạn đã đánh giá sản phẩm này
          </S.ReviewFormWrapper>
        );
      }
      return (
        <S.ReviewFormWrapper>
          <Form
            form={reviewForm}
            name="loginForm"
            layout="vertical"
            initialValues={{
              rate: 0,
              comment: "",
            }}
            onFinish={(values) => handleReviewProduct(values)}
          >
            <Form.Item
              label="Đánh giá sao"
              name="rate"
              rules={[
                { required: true, message: "Nhận xét là bắt buộc" },
                {
                  min: 1,
                  type: "number",
                  message: "Đánh giá sao là bắt buộc",
                },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Nhận xét"
              name="comment"
              rules={[{ required: true, message: "Nhận xét là bắt buộc" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi
            </Button>
          </Form>
        </S.ReviewFormWrapper>
      );
    }
    return (
      <S.ReviewFormWrapper>
        <Space>
          <span>Bạn chưa đăng nhập, bạn muốn đánh giá hãy đăng nhập</span>
          <Button
            style={{
              color: "red",
            }}
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Đăng nhập
          </Button>
        </Space>
      </S.ReviewFormWrapper>
    );
  }, [reviewList.data, userInfo.data]);

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <S.ReviewItemWrapper key={item.id}>
          <Space>
            <img
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              src={item.user.avatar}
              alt=""
            />
            <h3>{item.user.fullName}</h3>
            <p>{dayjs(item.createdAt).fromNow()}</p>
          </Space>
          <Rate
            value={item.rate}
            disabled
            style={{ display: "block", fontSize: 12 }}
          />
          <p>{item.comment}</p>
        </S.ReviewItemWrapper>
      );
    });
  }, [reviewList.data]);

  return (
    <S.ProductDetailWrapper>
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
          {
            title: (
              <Link
                to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
                  typeId: [productDetail.data.type?.id],
                })}`}
              >
                <Space>
                  <span>{productDetail.data.type?.name}</span>
                </Space>
              </Link>
            ),
          },
          {
            title: (
              <Link
                to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
                  categoryId: [productDetail.data.category?.id],
                })}`}
              >
                <Space>
                  <span>{productDetail.data.category?.name}</span>
                </Space>
              </Link>
            ),
          },
          {
            title: <span>{productDetail.data.name}</span>,
          },
        ]}
      />
      <S.ProductDetailContainer>
        <Card
          size="small"
          bordered={false}
          style={{
            marginTop: 20,
            border: "none",
            borderRadius: 10,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col md={10} sm={24}>
              <div
                className="slider-container"
                style={{ backgroundColor: "white", padding: "0 30px" }}
              >
                <Slider {...settings}>
                  <div>
                    <img
                      src={productDetail.data.image1}
                      alt=""
                      width="100%"
                      height="auto"
                    />
                  </div>
                  <div>
                    <img
                      src={productDetail.data.image2}
                      alt=""
                      width="100%"
                      height="auto"
                    />
                  </div>
                  <div>
                    <img
                      src={productDetail.data.image3}
                      alt=""
                      width="100%"
                      height="auto"
                    />
                  </div>
                </Slider>
              </div>
            </Col>

            <Col md={8} sm={24}>
              <h1>{productDetail.data.name}</h1>
              <Space>
                <Rate value={productRate} allowHalf disabled />
                <span>{`(${
                  productRate ? `${productRate} sao` : "Chưa có đánh giá"
                })`}</span>
              </Space>
              <div
                style={{
                  width: 350,
                  height: 70,
                  backgroundColor: "#f8f8f8",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "30px",
                  margin: "10px 0px",
                  border: "none",
                  borderRadius: 15,
                }}
              >
                <h3 style={{ color: "#d61010", fontSize: 18 }}>
                  {productDetail.data.price?.toLocaleString()} ₫
                </h3>
              </div>

              <div style={{ margin: "8px 0", fontSize: 18 }}>
                Số lượng: &nbsp;
                <InputNumber
                  value={quantity}
                  min={1}
                  onChange={(value) => setQuantity(value)}
                />
              </div>
              <Space>
                <Button
                  size="large"
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart()}
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  size="large"
                  type="text"
                  danger={isFavorite}
                  icon={
                    isFavorite ? (
                      <HeartFilled style={{ fontSize: 24 }} />
                    ) : (
                      <HeartOutlined
                        style={{ fontSize: 24, color: "#414141" }}
                      />
                    )
                  }
                  onClick={() => handleToggleFavorite()}
                ></Button>

                <p>{productDetail.data?.favorites?.length || 0} Lượt thích</p>
              </Space>
              <Button
                size="large"
                type="primary"
                style={{
                  backgroundColor: "red",
                  marginTop: "10px",
                  width: "100%",
                }}
                onClick={() => navigate(ROUTES.USER.CHECKOUT)}
              >
                Mua ngay
              </Button>
              <div style={{ marginTop: 20, fontSize: "14px" }}>
                <p>
                  👉Bảo hành chính hãng 12 tháng (Bản Việt Nam miễn phí, Bản Mỹ,
                  Sing... có phí)
                </p>
                <p>👉Phụ kiện theo hộp tùy theo nhà sản xuất</p>
                <p> 👉Giảm 30% giá phụ kiện khi mua kèm máy</p>
                <p>👉Hỗ trợ vệ sinh máy, phần mềm trọn đời</p>
              </div>
            </Col>
            <Col md={6} sm={24}>
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                  border: " none",
                  borderRadius: 10,
                  backgroundColor: "#FFF3CD",
                  padding: "10px 10px",
                }}
              >
                <img
                  style={{ width: 40, height: 40 }}
                  src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/customer-service.png?1709707792791"
                  alt=""
                />
                <p style={{ fontSize: 14, paddingLeft: 10 }}>
                  Gọi ngay <span style={{ color: "red" }}>0567.10.7979</span> /
                  <br />
                  <span1 style={{ color: "red" }}> 0568.10.7979</span1> / <br />
                  <span2 style={{ color: "red" }}> 0877.10.7979</span2>
                  để được tư <br />
                  vấn tốt nhất!
                </p>
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  border: " none",
                  borderRadius: 10,
                  backgroundColor: "#ededed",
                  padding: "10px 10px",
                }}
              >
                <p style={{ fontSize: 14, paddingLeft: 10 }}>
                  Tình trạng: <span style={{ color: "green" }}>Còn hàng</span>{" "}
                  <br />
                  Thương hiệu:&nbsp;
                  <span1 style={{ color: "green" }}>
                    {productDetail.data.category?.name}
                  </span1>{" "}
                  <br />
                  Loại: &nbsp;
                  <span2 style={{ color: "green" }}>
                    {productDetail.data.type?.name}
                  </span2>
                </p>
              </div>
              <div
                style={{
                  marginTop: 10,

                  border: " dashed yellow",
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  padding: "10px 10px",
                }}
              >
                <h4>
                  <GiftOutlined />
                  &nbsp; Ưu Đãi
                </h4>
                <p style={{ fontSize: 14, paddingLeft: 10 }}>
                  - Giảm giá sâu nhiều sản phẩm
                  <br />- Giảm giá Phụ kiện 30% tối đa 200k khi mua kèm điện
                  thoại
                  <br />- Giảm 5% tối đa 500k khi thanh toán qua Kredivo, Home
                  paylater lần đầu
                </p>
              </div>
            </Col>
          </Row>
        </Card>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={16}>
            <Card
              size="small"
              title={
                <span
                  style={{
                    color: "red",
                    fontSize: "22px",
                    padding: " 0px 20px",
                  }}
                >
                  Thông tin chi tiết
                </span>
              }
              bordered={false}
              style={{
                marginTop: 20,
                border: "none",
                borderRadius: 10,
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
              />
            </Card>
            <Card
              size="small"
              title="Đánh giá"
              bordered={false}
              style={{
                marginTop: 20,
                border: "none",
                borderRadius: 10,
              }}
            >
              {renderReviewForm}
              {renderReviewList}
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              size="small"
              title={
                <span
                  style={{
                    color: "red",
                    fontSize: "22px",
                    padding: " 0px 20px",
                  }}
                >
                  Thông số kỹ thuật
                </span>
              }
              bordered={false}
              style={{
                marginTop: 20,
                border: "none",
                borderRadius: 10,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetail.data.configuration,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Card
          style={{
            margin: "20px 60px",
            background: "linear-gradient(#aa1090, #4666f4)",
            border: "none",
            borderRadius: "15px",
          }}
          size="small"
          title={
            <span
              style={{ color: "red", fontSize: "30px", padding: " 0px 20px" }}
            >
              Sản phẩm liên quan
            </span>
          }
          bordered={false}
        >
          <S.SPBCWrapper>
            <Row gutter={[24, 24]}>{renderProductItems}</Row>
            {productList.data.length < productList.meta.total && (
              <Flex justify="center" style={{ marginTop: 16 }}>
                <Button onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
                  Hiển thị thêm
                </Button>
              </Flex>
            )}
          </S.SPBCWrapper>
        </Card>
      </S.ProductDetailContainer>
    </S.ProductDetailWrapper>
  );
};

export default ProductDetailPage;
