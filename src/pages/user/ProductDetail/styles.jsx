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
  object-fit: cover;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1); /* Phóng to 110% */
  }
`;
export const ProductTitle = styled.h3`
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.truncateMultiLine || 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 30px;
  font-size: 16px;
`;
export const DivWrapper = styled.div`
  &:hover h3 {
    color: #1ac2f0;
  }
`;
export const SPBCWrapper = styled.div`
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
