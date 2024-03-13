import styled from "styled-components";

export const ProductListWrapper = styled.div`
  margin: 0 auto;
  padding: 16px;
  max-width: 1450px;
`;
export const DeviceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DevicePhoneWrappe = styled.div`
  background-color: #f6f627;
  padding: 15px 25px 15px 40px;
  cursor: pointer;
  color: white;
  font-weight: 500;
  svg,
  span {
    font-size: 16px;
    margin-right: 5px;
  }
`;
export const ProductListContainer = styled.div`
  border: none;
  border-radius: 10px;
  background-color: #f4f4f4;
`;
export const ItemBlogBlock = styled.div`
  width: 150px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  margin: 5px 5px;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    background-color: #34ff34;
    border: none;
    border-radius: 10px;
    color: red
  }
`;

export const CheckBoxWrapper = styled.div`
  padding: 15px 25px 15px 40px;
`;

export const CartImg = styled.img`
  width: 150px !important;
  margin-left: 40px !important;
  margin-top: 10px !important;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1); /* Phóng to 110% */
  }
`;
export const DivWrapper = styled.div`
  &:hover h3 {
    color: #1ac2f0;
  }
`;
