import { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { getFavoriteListRequest } from "../../../redux/slicers/favorite.slice";

const FavoriteProducts = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getFavoriteListRequest({ userId: userInfo.data.id }));
  }, []);

  const tableColumns = [
    {
      title: "Mã yêu thích",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Hình ảnh",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <img
          src={product.image}
          alt=""
          style={{ width: "80px", height: "90px" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product) => <span>{product.name}</span>,
    },

    {
      title: "Giá",
      dataIndex: "product",
      key: "product",
      render: (product) => <span>{product.price?.toLocaleString()} ₫</span>,
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={favoriteList.data}
      rowKey="id"
      pagination={false}
      // expandable={{
      //   expandedRowRender: (record) => (
      //     <ul>
      //       {record.orderDetails.map((item) => (
      //         <li key={item.id}>
      //           {item.productName}
      //           {` - ${item.price}`}
      //           {` - ${item.quantity}`}
      //           {` - ${item.price * item.quantity}`}
      //         </li>
      //       ))}
      //     </ul>
      //   ),
      // }}
    />
  );
};

export default FavoriteProducts;
