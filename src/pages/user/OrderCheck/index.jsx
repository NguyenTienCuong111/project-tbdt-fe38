import { useEffect, useMemo } from "react";
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
} from "antd";
import dayjs from "dayjs";
import { HomeOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { GUEST_ID } from "constants/guest";
import {
  getCityListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from "../../../redux/slicers/location.slice";
import { getOrderListRequest } from "../../../redux/slicers/order.slice";

import * as S from "./styles";

function OrderCheckPage() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderListRequest({ userId: userInfo.data.id }));
  }, []);

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderDetails.length} sản phẩm`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "address",
      key: "address",
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (_, item) =>
        `${item.status}`,
    },
  ];

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
            title: "Kiếm tra đơn hàng",
          },
        ]}
      />
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>
        Kiểm tra đơn hàng
      </h2>
      <Card size="small">
        <Table
          columns={tableColumns}
          dataSource={orderList.data}
          rowKey="id"
          pagination={false}
          //   expandable={{
          //     expandedRowRender: (record) => (
          //       <Table
          //         columns={table2Column}
          //         dataSource={orderList}
          //         rowKey="productId"
          //         pagination={false}
          //       />
          //     ),
          //   }}
        />
      </Card>
    </S.CheckoutWrapper>
  );
}

export default OrderCheckPage;
