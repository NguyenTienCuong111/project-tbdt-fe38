import styled from "styled-components";

export const UserLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const UserLayoutContainer = styled.div`
  position: relative;
  flex: 1;
`;
export const BackTop = styled.div`
  position: fixed;
  right: 10px;
  bottom: 130px;
  z-index: 10001;
  display: block;
  width: 45px;
  height: 45px;
`;
