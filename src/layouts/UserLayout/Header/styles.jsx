import styled from "styled-components";

// Tạo các breakpoint cho responsive design
const breakpoints = {
  small: "576px", // Phone
  medium: "768px", // Tablet
  large: "992px", // Laptop
};

export const HeaderWrapper = styled.div`
  background-color: #f6f627;
`;

export const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  padding: 8px 16px;

  // Thay đổi định dạng cho Tablet
  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column; // Chuyển sang layout dọc
    align-items: center; // Căn giữa các phần tử
  }
`;

export const HeaderContainerMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  width: 100%;

  // Thay đổi định dạng cho Tablet
  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column; // Chuyển sang layout dọc
    align-items: center; // Căn giữa các phần tử
  }
`;

// Tạo các kiểu khác nhau cho responsive design cho các phần tử khác
// tùy thuộc vào kích thước của màn hình
// Ví dụ:
export const HeaderLogo = styled.div`
  &:hover {
    cursor: pointer;
  }

  // Thay đổi kích thước cho Phone
  @media (max-width: ${breakpoints.small}) {
    width: 120px;
    height: 40px;
  }

  // Thay đổi kích thước cho Tablet
  @media (max-width: ${breakpoints.medium}) {
    width: 100px;
    height: 30px;
  }
`;
export const BlogBlock = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
`;
export const ListStore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  border: none;
  font-size: 14px;
  border-radius: 5px;
`;
export const HeaderNavigation = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  align-items: center;
  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;
export const HeaderNavigationUl = styled.ul`
  display: flex;
  list-style: none;
  gap: 25px;
`;

export const HeaderNavigationLi = styled.li`
  font-weight: 600;
  &:hover {
    color: #fb0e01;
  }
`;
export const CartInfo = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1;
`;
export const Cart = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${CartInfo} {
    display: block;
  }
`;
