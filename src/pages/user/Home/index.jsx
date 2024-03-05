import { Link, generatePath } from "react-router-dom";
import qs from "qs";
import SliderComponentPage from "../SliderComponent";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function HomePage() {
  return (
    <S.HomeWrapper>
      <img
        src="https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/big_bn_slide.png?1709285773940"
        alt=""
      />
      <SliderComponentPage></SliderComponentPage>
      <div>
        <Link
          to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
            categoryId: [1],
          })}`}
        >
          Danh sách sản phẩm Apple
        </Link>
      </div>
      <div>
        <Link
          to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
            categoryId: [2],
          })}`}
        >
          Danh sách sản phẩm Samsung
        </Link>
      </div>
      
    </S.HomeWrapper>
  );
}

export default HomePage;
