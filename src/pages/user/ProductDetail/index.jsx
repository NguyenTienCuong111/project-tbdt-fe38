import { useEffect, useMemo, useState } from "react";
import React from "react";
import Slider from "react-slick";

import { useParams, Link } from "react-router-dom";
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
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import qs from "qs";

import { ROUTES } from "constants/routes";
import { getProductDetailRequest } from "../../../redux/slicers/product.slice";
import { addToCartRequest } from "../../../redux/slicers/cart.slice";

import * as S from "./styles";

const ProductDetailPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        productId: productDetail.data.id,
        name: productDetail.data.name,
        price: productDetail.data.price,
        image: productDetail.data.image,
        quantity: quantity,
      })
    );
    notification.success({ message: "Thêm vào giỏ thành công" });
  };

  const handleReviewProduct = (values) => {};

  const renderReviewForm = useMemo(() => {
    // if (userInfo.data.id) {
    //   const isReviewed = reviewList.data.some((item) => item.userId === userInfo.data.id)
    //   if (isReviewed) {
    //     return <S.ReviewFormWrapper>Bạn đã đánh giá sản phẩm này</S.ReviewFormWrapper>
    //   }
    //   return (
    //     <S.ReviewFormWrapper>
    //       <Form
    //         form={reviewForm}
    //         name="loginForm"
    //         layout="vertical"
    //         initialValues={{
    //           rate: 0,
    //           comment: '',
    //         }}
    //         onFinish={(values) => handleReviewProduct(values)}
    //       >
    //         <Form.Item
    //           label="Đánh giá sao"
    //           name="rate"
    //           rules={[
    //             { required: true, message: 'Nhận xét là bắt buộc' },
    //             {
    //               min: 1,
    //               type: 'number',
    //               message: 'Đánh giá sao là bắt buộc',
    //             },
    //           ]}
    //         >
    //           <Rate />
    //         </Form.Item>
    //         <Form.Item
    //           label="Nhận xét"
    //           name="comment"
    //           rules={[{ required: true, message: 'Nhận xét là bắt buộc' }]}
    //         >
    //           <Input.TextArea />
    //         </Form.Item>
    //         <Button type="primary" htmlType="submit" block>
    //           Gửi
    //         </Button>
    //       </Form>
    //     </S.ReviewFormWrapper>
    //   )
    // }
    // return <S.ReviewFormWrapper>Bạn chưa đăng nhập</S.ReviewFormWrapper>
  }, [userInfo.data]);

  const renderReviewList = useMemo(() => {
    // return reviewList.data.map((item) => {
    //   return (
    //     <S.ReviewItemWrapper key={item.id}>
    //       <Space>
    //         <h3>{item.user.fullName}</h3>
    //         <p>{dayjs(item.createdAt).fromNow()}</p>
    //       </Space>
    //       <Rate value={item.rate} disabled style={{ display: 'block', fontSize: 12 }} />
    //       <p>{item.comment}</p>
    //     </S.ReviewItemWrapper>
    //   )
    // })
  }, []);

  return (
    <S.ProductDetailWrapper>
      <Card size="small" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col md={10} sm={24}>
            <div
              className="slider-container"
              style={{ backgroundColor: "white", padding: "0 30px" }}
            >
              <Slider {...settings}>
                <div>
                  <img
                    src={productDetail.data.image}
                    alt=""
                    width="100%"
                    height="auto"
                  />
                </div>
                <div>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-tu-nhien-1-1.jpg"
                    alt=""
                    width="100%"
                    height="auto"
                  />
                </div>
                <div>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-tu-nhien-4-1.jpg"
                    alt=""
                    width="100%"
                    height="auto"
                  />
                </div>
                <div>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-tu-nhien-2-1.jpg"
                    alt=""
                    height="auto"
                  />
                </div>
                <div>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-tu-nhien-3-1.jpg"
                    alt=""
                    width="100%"
                    height="auto"
                  />
                </div>
              </Slider>
            </div>
          </Col>
          <Col md={14} sm={24}>
            <p size="sm">{productDetail.data.category?.name}</p>
            <h1>{productDetail.data.name}</h1>
            <h3 style={{ color: "#006363" }}>
              {productDetail.data.price?.toLocaleString()} ₫
            </h3>
            <div style={{ margin: "8px 0" }}>
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
                Add to cart
              </Button>
              <Button
                size="large"
                type="text"
                icon={
                  <HeartOutlined style={{ fontSize: 24, color: "#414141" }} />
                }
              ></Button>
              <p>{productDetail.data?.favorites?.length || 0} Lượt thích</p>
            </Space>
          </Col>
        </Row>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Card size="small" title="Thông tin sản phẩm" bordered={false}>
            <div
              dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
            />
          </Card>
          <Card
            size="small"
            title="Đánh giá"
            bordered={false}
            style={{ marginTop: 16 }}
          >
            {renderReviewForm}
            {renderReviewList}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small" title="Cấu hình" bordered={false}>
            Cấu hình
          </Card>
        </Col>
      </Row>
    </S.ProductDetailWrapper>
  );
};

export default ProductDetailPage;
