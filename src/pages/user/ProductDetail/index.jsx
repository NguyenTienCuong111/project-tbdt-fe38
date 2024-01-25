import { useEffect } from "react";
import { Row, Col, Card, Checkbox, Flex, Button, Input, Select } from "antd";
import { useParams, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetailRequest } from "../../../redux/slicers/product.slice";
import { ROUTES } from "constants/routes";

function ProductDetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: id }));
  }, [id]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div>
            <img
              style={{
                width: 400,
              }}
              src={productDetail.data.image}
              alt="image"
            />
          </div>
        </Col>
        <Col span={16}>
          <div>
            <h2>{productDetail.data.name}</h2>
          </div>
          <div>
            <h4>Price: {productDetail.data.price?.toLocaleString()} VND</h4>
          </div>
          <div>Category: {productDetail.data.category?.name}</div>
        </Col>
      </Row>

      <br />
      <div>Sản phẩm tương tự:</div>
      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 1 })}>
        Iphone 14
      </Link>
    </div>
  );
}

export default ProductDetailPage;
