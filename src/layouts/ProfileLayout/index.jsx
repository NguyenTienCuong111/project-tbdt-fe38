import { useMemo } from "react";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { Card, Row, Col, Breadcrumb, Space, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CameraOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { convertImageToBase64 } from "utils/file";
import { PROFILE_MENU } from "./constants";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { changeAvatarRequest } from "../../redux/slicers/auth.slice";

import * as S from "./styles";

function Profile() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const accessToken = localStorage.getItem("accessToken");

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      return notification.error({ message: "File không đúng định dạng" });
    }
    const imgBase64 = await convertImageToBase64(file);
    await dispatch(
      changeAvatarRequest({
        id: userInfo.data.id,
        data: {
          avatar: imgBase64,
        },
      })
    );
  };

  const renderProfileMenu = useMemo(() => {
    return PROFILE_MENU.map((item, index) => {
      return (
        <Link to={item.path} key={index} style={{ color: "black" }}>
          <S.ProfileMenuItem active={item.path === pathname}>
            <div>{item.icon}</div>
            <p style={{ marginLeft: 12 }}>{item.label}</p>
          </S.ProfileMenuItem>
        </Link>
      );
    });
  }, [pathname]);

  const profileLabel = useMemo(() => {
    return PROFILE_MENU.find((item) => item.path === pathname)?.label;
  }, [pathname]);

  if (accessToken && userInfo.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 100,
                textAlign: "center",
                marginTop: "50px",
              }}
              spin
            />
          }
        />
      </div>
    );
  } else if (!userInfo.data.id) {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  return (
    <S.ProfileWrapper>
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
            title: profileLabel,
          },
        ]}
        style={{ marginBottom: 8 }}
      />
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <S.ProfileMenuWrapper bordered={false} size="small">
            <S.AvatarContainer>
              <Space>
                <S.AvatarUpload>
                  <S.AvatarEdit>
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => handleChangeAvatar(e)}
                    />
                    <label htmlFor="imageUpload">
                      <CameraOutlined style={{ fontSize: 16 }} />
                    </label>
                  </S.AvatarEdit>
                  {userInfo.data.avatar ? (
                    <S.AvatarPreview
                      src={userInfo.data.avatar}
                      alt="User profile picture"
                    />
                  ) : (
                    <S.AvatarDefaultWrapper>
                      <S.AvatarDefaultContainer
                        icon={<UserOutlined style={{ fontSize: 36 }} />}
                      />
                    </S.AvatarDefaultWrapper>
                  )}
                </S.AvatarUpload>
                <h3>{userInfo.data.fullName}</h3>
              </Space>
              <p style={{ fontFamily: "initial", color: "#048f22" }}>
                {userInfo.data.email}
              </p>
              <S.SaleContainer>
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                  src="https://down-vn.img.susercontent.com/file/sg-11134004-7rcds-lsi2s50t92mv75"
                  alt="ảnh"
                />
                <span> Ngày 15 Sale Giữa Tháng</span>
              </S.SaleContainer>
            </S.AvatarContainer>
            <S.ProfileMenuContainer>{renderProfileMenu}</S.ProfileMenuContainer>
          </S.ProfileMenuWrapper>
        </Col>
        <Col md={18}>
          <Card
            bordered={false}
            size="small"
            title={
              <>
                <span
                  style={{
                    color: "red",
                    fontSize: "26px",
                    padding: " 0px 10px",
                  }}
                >
                  {profileLabel}
                </span>
                <p
                  style={{
                    color: "#474747",
                    fontSize: "16px",
                    padding: " 0px 10px",
                  }}
                >
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
              </>
            }
          >
            <Outlet />
          </Card>
        </Col>
      </Row>
    </S.ProfileWrapper>
  );
}

export default Profile;
