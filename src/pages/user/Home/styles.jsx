import styled, { css } from "styled-components";

// Define breakpoints
const breakpoints = {
  desktop: 1200,
  tablet: 768,
  phone: 576,
};

// Create media query template
const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const HomeWrapper = styled.div`
  background-color: #ececec;
  padding: 20px;
  ${media.tablet`
    padding: 10px;
  `}
`;

export const DeviceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DevicePhoneWrappe = styled.div`
  background-color: #f18585;
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

export const SPBCWrapper = styled.div`
  margin: 0 40px;
  width: 100%;
`;

export const KHDGWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
`;

export const NewsWrapper = styled.div`
  display: flex;

  width: 100%;
`;

export const NewsLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NewsRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

export const NewsItemWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Img = styled.img`
  width: 150px !important;
  height: 50px !important;
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
