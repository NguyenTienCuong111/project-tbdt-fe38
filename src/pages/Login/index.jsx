import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { ROUTES } from "constants/routes";
import { loginRequest } from "../../redux/slicers/auth.slice";

import * as S from "./styles";

const LoginPage = () => {
  const [loginForm] = Form.useForm();

  const { loginData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleSubmit = (values) => {
    dispatch(
      loginRequest({
        data: values,
        callback: (role) =>
          navigate(
            role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME
          ),
      })
    );
  };

  return (
    <S.LoginContainer>
      <S.LoginFormContainer>
        <S.LoginForm>
          <S.LoginLogo>
            <S.LoginLogoImage
              src="http://mauweb.monamedia.net/hanoicomputer/wp-content/uploads/2019/06/logo-final.png"
              alt=""
            />
          </S.LoginLogo>
          <S.LoginText>Login</S.LoginText>
          <Form
            style={{ marginTop: 10 }}
            form={loginForm}
            name="loginForm"
            layout="vertical"
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input style={{ borderRadius: "10px", height: 40 }} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password style={{ borderRadius: "10px", height: 40 }} />
            </Form.Item>
            <div style={{ marginBottom: 16 }}>
              Bạn chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký</Link>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                borderRadius: "10px",
                height: 40,
                color: "#000000",
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Button>
          </Form>
        </S.LoginForm>
      </S.LoginFormContainer>
      <S.LoginBannerContainer>
        <S.LoginBanner src="https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_1280.jpg"></S.LoginBanner>
      </S.LoginBannerContainer>
    </S.LoginContainer>
  );
};

export default LoginPage;
