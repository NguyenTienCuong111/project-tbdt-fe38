import { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { getOrderListRequest } from "../../../redux/slicers/order.slice";

const OrderHistories = () => {
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
      render: (totalPrice) => `${totalPrice.toLocaleString()} ₫`,
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
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <ul>
            {record.orderDetails.map((item) => (
              // <li key={item.id}>
              //   {item.productName}
              //   {` - ${item.price}`}
              //   {` - ${item.quantity}`}
              //   {` - ${item.price * item.quantity}`}
              // </li>
              <div
                key={item.id}
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "10px 10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "solid 1px #ccc",
                  margin: "10px 0px",
                  boxShadow: "rgb(38, 57, 77) 0px 20px 10px -10px",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{ width: "80px", height: "90px" }}
                />
                <div style={{ fontSize: 18, padding: "10px 20px" }}>
                  <p>{item.productName}</p>

                  <p>x{item.quantity}</p>
                </div>
                <div>
                  <Tag style={{ fontSize: 16 }} color="#f50">
                    {item.price.toLocaleString()} ₫
                  </Tag>
                </div>
              </div>
            ))}
          </ul>
        ),
      }}
    />
  );
};

export default OrderHistories;
