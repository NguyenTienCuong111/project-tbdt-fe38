import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  return (
    <Result
      status="success"
      title="Đơn hàng của bạn đã được thanh toán thành công!"
      subTitle="Chúng tôi sẽ gửi thông tin đơn hàng của bạn qua email."
      extra={[
        <Button
          type="primary"
          key="backToShop"
          onClick={() => navigate(ROUTES.USER.HOME)}
        >
          Quay lại cửa hàng
        </Button>,
        <Button
          onClick={() => navigate(ROUTES.USER.ORDER_CHECK)}
          key="checkOrder"
        >
          Kiểm tra đơn hàng
        </Button>,
      ]}
    />
  );
}
export default PaymentSuccessPage;
