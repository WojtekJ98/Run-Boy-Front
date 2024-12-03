import Image from "next/image";
import ImgAllProd from "../public/img/all_product_img.jpg";
import styled from "styled-components";

const ContainerImg = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 550px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
`;
const WrapperImg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const StyledImage = styled(Image)`
object-fit`;

export default function ProductPageSlider() {
  return (
    <ContainerImg>
      <WrapperImg>
        <Image
          src={ImgAllProd}
          fill={true}
          alt="Running Men"
          placeholder="blur"
          style={{ objectPosition: "50% 80%", objectFit: "cover" }}
        />
      </WrapperImg>
    </ContainerImg>
  );
}
