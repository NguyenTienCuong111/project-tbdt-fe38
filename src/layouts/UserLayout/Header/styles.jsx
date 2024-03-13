import styled from "styled-components";

export const HeaderWrapper = styled.div`
  background-color: #f6f627;
`;

export const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  padding: 8px 16px;
`;
export const HeaderContainerMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;

  width: 100%;
`;
export const HeaderLogo = styled.div`
  &:hover {
    cursor: pointer;
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
