import styled from "styled-components";
// Tạo các breakpoint cho responsive design
const breakpoints = {
  small: "576px", // Phone
  medium: "768px", // Tablet
  large: "992px", // Laptop
};

export const FooterWrapper = styled.div`
  background-color: #f6f627;
`;
export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  flex-wrap: wrap;

  padding: 8px 16px;
  cursor: pointer;
  @media (max-width: ${breakpoints.medium}) {
  
  }
`;
export const UlWrapper = styled.ul`
  list-style: none;
  font-size: 16px;
  color: #ed2929;
  font-weight: bold;
  margin-top: 10px;

  // Thay đổi định dạng cho Tablet
  @media (max-width: ${breakpoints.medium}) {

    width: 50%;
  }
`;
export const LiWrapper = styled.li`
  margin-top: 15px;
  font-size: 14px;
  color: #0d0b0b;
  font-weight: 500;
`;
export const PayLiWrapper = styled.li`
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
  align-items: center;

  // Thay đổi định dạng cho Tablet
  @media (max-width: ${breakpoints.medium}) {
    flex: 0 0 100%;
    max-width: 100%;
    justify-content: center;
  }
  img {
    width: 100%;
    max-width: 270px;
  }
`;
export const SignUpLiWrapper = styled.li`
  color: #ed2929;
  margin-top: 15px;
  @media (max-width: ${breakpoints.medium}) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;
