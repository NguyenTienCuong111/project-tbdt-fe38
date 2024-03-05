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
export const CheckBoxWrapper = styled.div`
  padding: 15px 25px 15px 40px;
`;

export const CartImg = styled.img`
  width: 150px !important;
  margin-left: 40px !important;
  margin-top: 10px !important;
  transition: transform 0.5s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;
export const DivWrapper = styled.div`
  &:hover h3 {
    color: #1ac2f0;
  }
`;
