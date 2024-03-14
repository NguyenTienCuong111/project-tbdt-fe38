import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Card,
  Space,
  Table,
  Breadcrumb,
  notification,
  Badge,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { GUEST_ID } from "constants/guest";
import {
  getCityListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from "../../../redux/slicers/location.slice";
import { orderProductRequest } from "../../../redux/slicers/order.slice";

import * as S from "./styles";

function CheckoutPage() {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Lấy số lượng sản phẩm từ localStorage khi component được tạo
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartList"));
    if (cartItems) {
      const itemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartItemCount(itemCount);
    }
  }, []);
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { userInfo } = useSelector((state) => state.auth);

  const totalPrice = useMemo(
    () =>
      cartList.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartList]
  );

  useEffect(() => {
    dispatch(getCityListRequest());
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.setFieldsValue({
        fullName: userInfo.data.fullName,
        email: userInfo.data.email,
      });
    }
  }, [userInfo.data]);

  const tableColumn = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text, item) => (
        <Badge style={{ backgroundColor: "#0854ce" }} count={item.quantity}>
          <img src={text} alt="" style={{ width: "80px", height: "80px" }} />
        </Badge>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Tổng giá",
      dataIndex: "total",
      key: "total",
      render: (_, item) => `${(item.price * item.quantity).toLocaleString()}₫`,
    },
  ];
  const handleSubmitCheckoutForm = (values) => {
    const cityData = cityList.data.find(
      (city) => city.code === values.cityCode
    );
    const districtData = districtList.data.find(
      (district) => district.code === values.districtCode
    );
    const wardData = wardList.data.find(
      (ward) => ward.code === values.wardCode
    );
    dispatch(
      orderProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id || GUEST_ID,
          status: "pending",
          totalPrice: totalPrice,
          cityName: cityData.name,
          districtName: districtData.name,
          wardName: wardData.name,
          cartList: cartList,
        },
        callback: () => navigate(ROUTES.USER.PAYMENTSUCCESS),
      })
    );
    notification.success({ message: "Thanh toán thành công" });
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((city) => (
      <Select.Option key={city.code} value={city.code}>
        {city.name}
      </Select.Option>
    ));
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((district) => (
      <Select.Option key={district.code} value={district.code}>
        {district.name}
      </Select.Option>
    ));
  }, [districtList.data]);

  const renderWardOptions = useMemo(() => {
    return wardList.data.map((ward) => (
      <Select.Option key={ward.code} value={ward.code}>
        {ward.name}
      </Select.Option>
    ));
  }, [wardList.data]);

  return (
    <S.CheckoutWrapper>
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
            title: "Thủ tục thanh toán",
          },
        ]}
      />
      <S.CheckoutContainer>
        <h2 style={{ marginBottom: 16, textAlign: "center", color: "#1650ef" }}>
          Thủ tục thanh toán
        </h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={14} span={14}>
            <Form
              name="checkoutForm"
              form={checkoutForm}
              layout="vertical"
              onFinish={(values) => handleSubmitCheckoutForm(values)}
            >
              <Card
                size="small"
                title={
                  <span
                    style={{
                      color: "#c51515",
                      fontSize: "22px",
                      padding: " 0px 20px",
                    }}
                  >
                    Thông tin nhận hàng
                  </span>
                }
                style={{ marginBottom: 24 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="Họ và tên"
                      name="fullName"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phoneNumber"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Tỉnh/Thành"
                      name="cityCode"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Select
                        onChange={(value) => {
                          dispatch(getDistrictListRequest({ cityCode: value }));
                          checkoutForm.setFieldsValue({
                            districtCode: undefined,
                            wardCode: undefined,
                          });
                        }}
                        allowClear
                      >
                        {renderCityOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Quận/Huyện"
                      name="districtCode"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Select
                        onChange={(value) => {
                          dispatch(getWardListRequest({ districtCode: value }));
                          checkoutForm.setFieldsValue({
                            wardCode: undefined,
                          });
                        }}
                        disabled={!checkoutForm.getFieldValue("cityCode")}
                        allowClear
                      >
                        {renderDistrictOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Phường/Xã"
                      name="wardCode"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Select
                        disabled={!checkoutForm.getFieldValue("districtCode")}
                        allowClear
                      >
                        {renderWardOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card
                size="small"
                title={
                  <span
                    style={{
                      color: "#c51515",
                      fontSize: "22px",
                      padding: " 0px 20px",
                    }}
                  >
                    Thông tin thanh toán
                  </span>
                }
                style={{ marginBottom: 24 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="Phương thức thanh toán"
                      name="paymentMethod"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio value="cod">
                            Thanh toán Sau khi nhận hàng (COD)
                          </Radio>
                          <Radio value="atm">
                            Phương thức thanh ví (Momo, Vnpay, Zalopay)
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Row justify="space-between">
                <Button onClick={() => navigate(ROUTES.USER.CART)}>
                  Quay về giỏ hàng
                </Button>
                <Button
                  onClick={() => navigate(ROUTES.USER.PAYMENTSUCCESS)}
                  type="primary"
                  htmlType="submit"
                >
                  Đặt hàng
                </Button>
              </Row>
            </Form>
          </Col>
          <Col xs={24} md={10} span={10}>
            <Card
              size="small"
              title={
                <span
                  style={{
                    color: "#1541c5",
                    fontSize: "22px",
                    padding: " 0px 20px",
                  }}
                >
                  Đơn hàng ({cartItemCount} sản phẩm)
                </span>
              }
              style={{ marginBottom: 24 }}
            >
              <Table
                size="small"
                columns={tableColumn}
                dataSource={cartList}
                rowKey="id"
                pagination={false}
              />
            </Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: " none",
                width: "100%",
                borderRadius: 10,
                backgroundColor: "#FFF3CD",
                padding: "10px 10px",
              }}
            >
              <h3>Tổng cộng: &nbsp;</h3>
              <h3>{totalPrice.toLocaleString()} ₫</h3>
            </div>
          </Col>
        </Row>
      </S.CheckoutContainer>
    </S.CheckoutWrapper>
  );
}

export default CheckoutPage;
