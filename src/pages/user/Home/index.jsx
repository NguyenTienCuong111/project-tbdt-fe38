import qs from "qs";
import SliderComponentPage from "../SliderComponent";
import { Card, Col, Row, Rate, Button, Flex, Tag } from "antd";
import { useState, useEffect, useMemo } from "react";

import { ROUTES } from "constants/routes";

import * as S from "./styles";
import { getProductListRequest } from "../../../redux/slicers/product.slice";

import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { PRODUCT_LIMIT } from "constants/paging";

function HomePage() {
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  var settings = {
    dots: false,
    infinite: true,

    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  var settings2 = {
    dots: false,
    infinite: true,

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
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

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [searchParams]);

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              size="small"
              style={{
                width: 240,
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
                <Rate style={{ marginTop: 10 }} value={5} allowHalf disabled />
              </S.DivWrapper>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);
  return (
    <S.HomeWrapper>
      <img
        src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/big_bn_slide.png?1709285773940"
        alt=""
      />
      <SliderComponentPage></SliderComponentPage>
      <Card
        style={{
          margin: "20px 60px",
          background: "linear-gradient(#e9ff23, #d746f4)",
          border: "none",
          borderRadius: "15px",
        }}
        size="small"
        title={
          <span
            style={{ color: "red", fontSize: "30px", padding: " 0px 20px" }}
          >
            Sản phẩm bán chạy
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
      <div
        style={{
          margin: "20px 60px",
        }}
      >
        <img
          src="//bizweb.dktcdn.net/100/177/937/themes/881538/assets/bn_pr_5.png?1709707792791"
          alt=""
        />
      </div>
      <Card
        style={{
          margin: "20px 60px",
          background: "linear-gradient(#e3e3dc, #e8f446)",
          border: "none",
          borderRadius: "15px",
        }}
        size="small"
        title={
          <span
            style={{ color: "red", fontSize: "30px", padding: " 0px 20px" }}
          >
            Khách hàng đánh giá
          </span>
        }
        bordered={false}
      >
        <Slider {...settings2}>
          <div>
            <div
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "10px 20px",
                margin: "10px 20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                  src="https://bizweb.dktcdn.net/thumb/small/100/177/937/themes/881538/assets/ykkh_1.jpg?1709707792791"
                  alt=""
                />
                <h2 style={{ paddingLeft: 10, color: "#e71b1b" }}>
                  Nguyễn thị lệ
                </h2>
              </div>
              <p style={{ fontSize: 16 }}>
                Mình rất ưng khi đến MONA Computer. Ở đây có rất nhiều sản phẩm
                phong phú, tha hồ lựa chọn. Nhân viên chuyên nghiệp, nhiệt tình.
                Chúc MONA Computer ngày càng phát triển.
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "10px 20px",
                margin: "10px 20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                  src="https://bizweb.dktcdn.net/thumb/small/100/177/937/themes/881538/assets/ykkh_2.jpg?1709707792791"
                  alt=""
                />
                <h2 style={{ paddingLeft: 10, color: "#e71b1b" }}>Chị Hương</h2>
              </div>
              <p style={{ fontSize: 16 }}>
                Tôi đem điện thoại đến đây kiểm tra sửa hna sạc, thợ xem bảo chỉ
                bẩn vệ sinh là xài dc, Shop làm ăn rất uy tin, nếu vào chổ kac
                chắc bị sửa lấy tiền rồi, cảm ơn shop, sau này sẽ ủng hộ thêm
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "10px 20px",
                margin: "10px 20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                  src="https://bizweb.dktcdn.net/thumb/small/100/177/937/themes/881538/assets/ykkh_3.jpg?1709707792791"
                  alt=""
                />
                <h2 style={{ paddingLeft: 10, color: "#e71b1b" }}>Em Hồng</h2>
              </div>
              <p style={{ fontSize: 16 }}>
                Mình mua điện thoại shop tư vấn bán rất nhiệt tình, xài mấy
                tháng rồi cảm thấy máy rất mượt, dù máy cũ nhunge cũng xài ngon
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "10px 20px",
                margin: "10px 20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                  src="https://bizweb.dktcdn.net/thumb/small/100/177/937/themes/881538/assets/ykkh_4.jpg?1709707792791"
                  alt=""
                />
                <h2 style={{ paddingLeft: 10, color: "#e71b1b" }}>Chú Tâm</h2>
              </div>
              <p style={{ fontSize: 16 }}>
                Mình chạy Grap, cần điện thoại tầm trung mà mượt để sử dụng, tôi
                đã mua cây Samsung M51 mới tại MONA Computer, xài rất ok, mượt,
                pin lâu hết
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "10px 20px",
                margin: "10px 20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                  src="https://bizweb.dktcdn.net/thumb/small/100/177/937/themes/881538/assets/ykkh_5.jpg?1710235579333"
                  alt=""
                />
                <h2 style={{ paddingLeft: 10, color: "#e71b1b" }}>Cô My</h2>
              </div>
              <p style={{ fontSize: 16 }}>
                Mình hay dán cường lực màn hình và mua ốp lưng của shop, hàng
                shop bán uy đẹp, nhiều mẫu hot trend cute hột me.
              </p>
            </div>
          </div>
        </Slider>
      </Card>
      <Card
        style={{
          margin: "20px 60px",
          background: "white",
          border: "none",
          borderRadius: "15px",
        }}
        size="small"
        title={
          <span
            style={{ color: "black", fontSize: "30px", padding: " 0px 20px" }}
          >
            Hình ảnh khách hàng
          </span>
        }
        bordered={false}
      >
        <Slider {...settings}>
          <div>
            <div style={{ padding: "10px 20px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/home_customer_3.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: "10px 20px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/home_customer_4.jpg?17097077927915"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: "10px 20px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/home_customer_5.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: "10px 20px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/home_customer_2.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: "10px 20px" }}>
              <img
                src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/home_customer_1.jpg?1709707792791"
                alt=""
                width="100%"
                height="auto"
              />
            </div>
          </div>
        </Slider>
      </Card>
      <Card
        style={{
          margin: "20px 60px",
          background: "white",
          border: "none",
          borderRadius: "15px",
        }}
        size="small"
        title={
          <span
            style={{ color: "black", fontSize: "30px", padding: " 0px 20px" }}
          >
            Tin tức
          </span>
        }
        bordered={false}
      >
        <S.NewsWrapper>
          <S.NewsLeftWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <div>
                <img
                  style={{ width: 300 }}
                  src="https://bizweb.dktcdn.net/100/177/937/articles/tai-xuong-7748ff70-541f-428f-8023-9f943f9922fc.jpg?v=1710041469867"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h2>10 mẹo hay khi sử dụng android</h2>
              <span style={{ fontSize: 16 }}>
                10 mẹo vặt cho Android mà bạn nên biết Android là một hệ điều
                hành mở với vô vàn những tính năng thời thượng. Tuy vậy, bạn có
                dám chắc mình đã làm chủ được “cô nàng ỏng ẹo
              </span>
            </div>
          </S.NewsLeftWrapper>
          <S.NewsRightWrapper>
            <S.NewsItemWrapper>
              <S.Img
                src="https://bizweb.dktcdn.net/thumb/medium/100/177/937/articles/ios-17-4-co-nhung-tinh-nang-gi-moi-xtmobile.jpg?v=1709958219947"
                alt=""
              />
              <div style={{ paddingLeft: 20 }}>
                <h3>Có nên cập nhật lên iOS 17.4 không ?</h3>
                <span style={{ fontSize: 16 }}>
                  iPhone nào không được cập nhật 09/03/2024 Tổng hợp những lý do
                  mà người dùng nên và không nên cập nhật hệ điều hành iOS 17.4
                  cho iPhone ngay bây giờ! Mới đây
                </span>
              </div>
            </S.NewsItemWrapper>
            <S.NewsItemWrapper>
              <S.Img
                src="https://bizweb.dktcdn.net/thumb/medium/100/177/937/articles/3-cach-sac-va-bao-quan-pin-laptop-dung-cach-hieu-12-1-800x450.jpg?v=1709894227767"
                alt=""
              />
              <div style={{ paddingLeft: 20 }}>
                <h3>10 mẹo sạc pin laptop đúng cách tăng tuổi thọ cho pin</h3>
                <span style={{ fontSize: 16 }}>
                  Nếu bạn muốn tăng tuổi thọ cho pin laptop hoặc MacBook để sử
                  dụng lâu dài thì hãy đọc bài viết này. Bài viết này sẽ chia sẻ
                  10
                </span>
              </div>
            </S.NewsItemWrapper>
            <S.NewsItemWrapper>
              <S.Img
                style={{ width: "100px" }}
                src="https://bizweb.dktcdn.net/thumb/medium/100/177/937/articles/phone-low-batt-800x450.jpg?v=1709891535307"
                alt=""
              />
              <div style={{ paddingLeft: 20 }}>
                <h3>Bị Chai PIN Có Thể Khắc Phục Không Hay Phải Mua Mới?</h3>
                <span style={{ fontSize: 16 }}>
                  Pin điện thoại bị 'chai', có thể khắc phục không? Nếu có cách
                  thì khắc phục như nào? (2023) 23/04/23 Pin “chai” là hiện
                  tượng
                </span>
              </div>
            </S.NewsItemWrapper>
            <S.NewsItemWrapper>
              <S.Img
                src="https://bizweb.dktcdn.net/thumb/medium/100/177/937/articles/unnamed.jpg?v=1709865622717"
                alt=""
              />
              <div style={{ paddingLeft: 20 }}>
                <h3>18 Cách Chụp Ảnh Đẹp Cho Người Không Ăn Ảnh Ít Ai Biết</h3>
                <span style={{ fontSize: 16 }}>
                  Bạn thắc mắc sao soi gương xinh thế mà chụp ảnh mãi chả được
                  tấm nào ưng ý? Bạn thử đi tìm ngay cách chụp ảnh đẹp
                </span>
              </div>
            </S.NewsItemWrapper>
            <Flex justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
                Xem thêm
              </Button>
            </Flex>
          </S.NewsRightWrapper>
        </S.NewsWrapper>
      </Card>
      <div style={{ height: 100 }}></div>
    </S.HomeWrapper>
  );
}

export default HomePage;
