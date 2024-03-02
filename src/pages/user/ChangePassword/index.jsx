import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";

function ChangePassword() {
  const [changePasswordForm] = Form.useForm();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChangePassword = (values) => {};

  return (
    <Form
      form={changePasswordForm}
      name="changePasswordForm"
      layout="vertical"
      onFinish={(values) => handleChangePassword(values)}
      autoComplete="off"
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your new password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: "Please input your confirm new password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Thay đổi
      </Button>
    </Form>
  );
}

export default ChangePassword;
