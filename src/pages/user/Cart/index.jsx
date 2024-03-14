import { useMemo } from "react";
import {
  Table,
  Button,
  InputNumber,
  Row,
  Col,
  Card,
  Space,
  Breadcrumb,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined, GiftOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";

import {
  updateCartItemRequest,
  deleteCartItemRequest,
  clearCartRequest,
} from "../../../redux/slicers/cart.slice";

import * as S from "./styles";
import styled from "styled-components";

function CartPage() {
  const StyledButton = styled(Button)`
    background-color: #f42626;

    &:hover {
      background-color: #f5e510;
    }
  `;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);

  const totalPrice = useMemo(
    () =>
      cartList.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartList]
  );

  const handleChangeQuantity = (productId, value) => {
    dispatch(
      updateCartItemRequest({
        productId: productId,
        quantity: value,
      })
    );
  };

  const handleDeleteCartItem = (productId) => {
    dispatch(deleteCartItemRequest({ productId: productId }));
  };
  const handleDeleteAllCartItem = () => {
    dispatch(clearCartRequest());
  };

  const tableColumn = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="" style={{ width: "80px", height: "100px" }} />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, item) => {
        return `${item.price.toLocaleString()}  ₫`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item) => (
        <InputNumber
          value={item.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(item.productId, value)}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()}  ₫`,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Button danger onClick={() => handleDeleteCartItem(item.productId)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <S.CartListWrapper>
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
            title: "Giỏ hàng",
          },
        ]}
      />
      <S.CartListContainer>
        <h2 style={{ marginBottom: 16, textAlign: "center", color: "red" }}>
          Giỏ hàng
        </h2>
        <Card
          size="small"
          style={{
            marginTop: 20,
            border: "none",
            borderRadius: 10,
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={16} span={16}>
              <Table
                columns={tableColumn}
                dataSource={cartList}
                rowKey="productId"
                pagination={false}
              />
            </Col>

            <Col xs={24} md={8} span={8}>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  border: " none",
                  borderRadius: 10,
                  height: 70,
                  backgroundColor: "#F9420E",
                  padding: "10px 10px",
                }}
              >
                <h4 style={{ color: "white" }}>TỔNG TIỀN</h4>
                <p
                  style={{
                    fontSize: 14,
                    paddingLeft: 10,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {totalPrice.toLocaleString()} ₫
                </p>
              </div>
              <S.ButtonTTContainer>
                <StyledButton
                  style={{
                    marginTop: 10,

                    border: " none",
                    borderRadius: 10,
                    height: 60,
                    width: "100%",
                    fontSize: 20,
                  }}
                  type="primary"
                  disabled={!cartList.length}
                  onClick={() => navigate(ROUTES.USER.CHECKOUT)}
                >
                  THANH TOÁN
                </StyledButton>
                <Button
                  style={{
                    marginTop: 10,

                    backgroundColor: "#343A40",
                    border: " none",
                    borderRadius: 10,
                    height: 40,
                    width: "100%",
                    fontSize: 20,
                  }}
                  disabled={!cartList.length}
                  onClick={() => handleDeleteAllCartItem()}
                >
                  XOÁ TẤT CẢ
                </Button>
              </S.ButtonTTContainer>
              <div
                style={{
                  marginTop: 10,

                  border: " dashed yellow",
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  padding: "10px 10px",
                }}
              >
                <h4 style={{ color: "#cbbe09" }}>
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
      </S.CartListContainer>
    </S.CartListWrapper>
  );
}

export default CartPage;
