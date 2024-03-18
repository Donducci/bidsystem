import { ProductDetailContainer, ProductImageWrapper, ProductDetailWrapper  } from "./productDetail.style";
import Image from "next/image";

export default function ProductDetail({ collectionData }) {
  const src = "https://m.media-amazon.com/images/I/71Ahikg0-IL.__AC_SX300_SY300_QL70_FMwebp_.jpg";

  return (
      <>
        <ProductDetailContainer>
            <ProductImageWrapper>
              <Image
                  src={src}
                  width={300}
                  height={300}
                  alt="a cool image"
                />
            </ProductImageWrapper>
        <ProductDetailWrapper>
          {
            collectionData && (
              <>
                <h1>{collectionData.name}</h1>
                <h3>{collectionData.description}</h3>
                <span>{`Price: $${collectionData.price}`}</span>
                <span>{`Stocks: ${collectionData.price}`}</span>
              </>)
          }
          </ProductDetailWrapper>
        </ProductDetailContainer>
      </>
    )
}