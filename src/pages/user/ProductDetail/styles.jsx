import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  margin: 0 auto;
  padding: 16px;
  max-width: 1232px;
`;
export const ProductDetailContainer = styled.div`
  background-color: #f4f4f4;
  padding: 10px 10px;
  margin: 15px auto;
  border: none;
  border-radius: 15px;
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
export const SPBCWrapper = styled.div`
  margin: 0 40px;
  width: 100%;
`;

export const ProductContent = styled.div`
  & img {
    width: 100%;
    height: auto;
  }
`;

export const ReviewFormWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f0f2f5;
`;

export const ReviewItemWrapper = styled.div`
  margin-top: 8px;
`;
