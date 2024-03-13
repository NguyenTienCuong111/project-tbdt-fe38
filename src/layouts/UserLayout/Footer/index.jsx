import { Button, Flex, Input, Space } from "antd";
import * as S from "./styles";

function Footer() {
  return (
    <S.FooterWrapper style={{ marginTop: 30 }}>
      <S.FooterContainer>
        <S.UlWrapper>
          Hệ Thống Mona media
          <S.LiWrapper>Chính sách & quy định chung</S.LiWrapper>
          <S.LiWrapper>Chính sách đổi trả sản phẩm</S.LiWrapper>
          <S.LiWrapper>Chính sách bảo hành</S.LiWrapper>
          <S.LiWrapper>Chính sách giao hàng</S.LiWrapper>
        </S.UlWrapper>
        <S.UlWrapper>
          Thông tin khuyến mãi
          <S.LiWrapper>Giới thiệu</S.LiWrapper>
          <S.LiWrapper>Tin tức</S.LiWrapper>
          <S.LiWrapper>Tin khuyến mãi</S.LiWrapper>
          <S.LiWrapper>Tuyển dụng</S.LiWrapper>
        </S.UlWrapper>

        <S.UlWrapper>
          Hệ Thống Mona media
          <S.LiWrapper>Chính sách & quy định chung</S.LiWrapper>
          <S.LiWrapper>Chính sách đổi trả sản phẩm</S.LiWrapper>
          <S.LiWrapper>Chính sách bảo hành</S.LiWrapper>
          <S.LiWrapper>Chính sách giao hàng</S.LiWrapper>
        </S.UlWrapper>
        <S.UlWrapper>
          Thanh toán an toàn
          <S.PayLiWrapper>
            <img
              style={{ width: "270px" }}
              alt="tienmat"
              src="https://mauweb.monamedia.net/hanoicomputer/wp-content/uploads/2019/06/sprite-2.png"
            ></img>
          </S.PayLiWrapper>
          <S.SignUpLiWrapper>
            Đăng ký nhận tin
            <Space.Compact
              style={{
                width: "100%",
                marginTop: 15,
              }}
            >
              <Input placeholder="Email ..." />
              <Button htmlType="submit">Gửi</Button>
            </Space.Compact>
          </S.SignUpLiWrapper>
        </S.UlWrapper>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
}

export default Footer;
