import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

import { updateUserInfoRequest } from "../../../redux/slicers/auth.slice";

function UserInfo() {
  const [updateUserInfoForm] = Form.useForm();

  const { userInfo, updateUserInfoData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.data.id) {
      updateUserInfoForm.setFieldsValue({
        fullName: userInfo.data.fullName,
        email: userInfo.data.email,
        phoneNumber: userInfo.data.phoneNumber,
        birthday: userInfo.data.birthday
          ? dayjs(userInfo.data.birthday)
          : undefined,
      });
    }
  }, [userInfo.data]);

  const handleUpdateUserInfo = (values) => {
    dispatch(
      updateUserInfoRequest({
        id: userInfo.data.id,
        data: {
          ...values,
          birthday: dayjs(values.birthday).valueOf(),
        },
      })
    );
  };

  return (
    <Form
      form={updateUserInfoForm}
      name="updateUserInfoForm"
      layout="vertical"
      onFinish={(values) => handleUpdateUserInfo(values)}
    >
      <Form.Item
        label="Tên đăng nhập"
        name="fullName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="birthday"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker placeholder="Chọn ngày" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Lưu
      </Button>
    </Form>
  );
}

export default UserInfo;
