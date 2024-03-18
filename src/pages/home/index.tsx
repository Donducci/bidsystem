import React, { useEffect, useState } from 'react';
import Layout from "@/layout/layout";
import { ProductContainer, ProductStatusWrapper, ProductCountsText, ProductViewContainer, ProductViewSwitchButton, ProductListsWrapper, ProductListContainer, ProductContentContent, ProductPrice, ProductListImage } from "./home.style";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/libs/utils/hook';
import { fetchAllCollections } from '@/store/collectionSlice';
import Delete from '@/libs/icons/delete';
import Edit from '@/libs/icons/edit';
import { CallToAction } from '@/libs/shared-components/callToAction/callToAction';
import { ActionContainer } from './home.style';
import { deleteCollection, updateCollection, createBid } from '../api';
import Modal from '@/components/modal';
import BidModal from '@/components/bidModal';
import { jwtDecode } from 'jwt-decode';
import { getBids } from '../api';
import { RootState } from '@/store/store';



interface ProductProps {
  id: number,
  name: string,
  description?: string,
  price: number;
  userId?: number;
  stocks: number;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface BidData {
  userId: number;
  collectionId: number;
  price: number;
  stocks: number;
  status: 'pending' | 'accepted' | 'rejected';
}

const switchProduct = [
  {
    isActive: true,
    label: 'All Products'
  },
  {
    isActive: false,
    label: 'My Products'
  },
]

export default function Home() {
  const dispatch = useAppDispatch();
  const collections = useSelector((state: RootState) => state.collection.collections);
  const status = useSelector((state: RootState) => state.collection.status);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [collectionLists, setCollectionLists] = useState<ProductProps[]>([]);
  const [showPlaceBid, setShowPlaceBid] = useState<Record<number, boolean>>({});

  const [changeProducts, setChangeProducts] = useState(switchProduct);
  const { push } = useRouter()
  const src = "https://m.media-amazon.com/images/I/71Ahikg0-IL.__AC_SX300_SY300_QL70_FMwebp_.jpg";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const toggleBidModal = () => {
    setIsBidModalOpen(!isBidModalOpen);
  }

  const handleChangeProductsView = (label: string) => {
    const updateProducts = changeProducts.map((product) => {
      return {
        ...product,
        isActive: product.label === label
      }
    });
    setChangeProducts(updateProducts);
  }

  const handleGoToPDP = (id: number) => {
    push(`/product-detail/${id}`);
  }

  const handleDelete = async (event: React.MouseEvent, id: number): Promise<void> => {
    event.stopPropagation();
    await deleteCollection(id);
    dispatch(fetchAllCollections());
  };


   const handleEdit = (event: any, product: ProductProps) => {
    event.stopPropagation();
    setSelectedProduct(product);
    toggleModal();
   }

  const handleUpdate = (data, productId) => {
    const collectionData = { ...data, userId: userData.id }

    updateCollection(productId, collectionData).then(() => {
      dispatch(fetchAllCollections());
      toggleModal();
    });
  }

  const handleBid = (event: any, product: any) => {
    event.stopPropagation();
    setSelectedProduct(product);
    dispatch(fetchAllCollections());
    toggleBidModal();
  }

  const handleBidApply = async (data: BidData) => {
  const bidData = { ...data, userId: userData.id };
  try {
    await createBid(bidData);

    setShowPlaceBid(prevState => ({
      ...prevState,
      [selectedProduct.id]: false
    }));
    toggleBidModal(); // Close the bid modal
  } catch (error) {
    console.error('Error placing bid:', error);
  }
};

  const renderPlaceButton = (productId) => {
    if (showPlaceBid[productId]) {
      
      return <CallToAction type="button" label="Place Bid" size="2xs" onClick={(event) => handleBid(event, productId)} />;
    }
    return null;
  };

  const renderPrice = (price: number) => {
    const parts = price.toString().split('.');
    return <ProductPrice><span>${parts[0]}</span><span>{parts[1]}</span></ProductPrice>
  }

  useEffect(() => {
    if (isModalOpen || isBidModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return () => {
        document.body.style.overflow = '';
    };
}, [isModalOpen, isBidModalOpen]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCollections());
    }
  }, [status, dispatch, changeProducts, userData])

  useEffect(() => {
    if (status === 'succeeded') {
      setCollectionLists(collections);
    }
  }, [collections, status]);
  
  useEffect(() => {
    const fetchAndDetermineBids = async (): Promise<void> => {
    let showBidObj = {};
    for (let product of collectionLists) {
      try {
        const data = await getBids(product.id);
        
        const userHasBid = data.bid.some(bid => bid.userId === userData.id);
        showBidObj[product.id] = !userHasBid;
      } catch (error) {
        console.error('Error fetching bids for product', product.id, error);
        showBidObj[product.id] = false; 
      }
    }

    setShowPlaceBid(showBidObj);
  };

  if (userData && collectionLists.length > 0) {
    fetchAndDetermineBids();
  }
}, [userData, collectionLists]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token) as UserData;
        setUserData(decoded);
    }
  }, []);

	return (
		<Layout>
			<ProductContainer isModalOpen={isModalOpen}>
				<ProductStatusWrapper>
          <ProductCountsText>{ collectionLists.length } products</ProductCountsText>
           {isModalOpen && <Modal toggleModal={toggleModal} selectedProduct={selectedProduct} handleUpdate={handleUpdate} />}
           {isBidModalOpen && <BidModal toggleModal={toggleBidModal} handleBidApply={handleBidApply} selectedProduct={selectedProduct} />}
				</ProductStatusWrapper>
        <ProductListsWrapper>
          {
            collectionLists.map((product: ProductProps, index) => (
              <ProductListContainer key={index} onClick={() => handleGoToPDP(product.id)}>
                <ProductListImage>
                  <Image
                    src={src}
                    width={80}
                    height={60}
                    alt="product image"
                  />
                </ProductListImage>
                <ProductContentContent>
                  { product.name }
                </ProductContentContent>
                {renderPrice(product.price)}
                <ActionContainer>
                  {
                    userData?.id === product.userId ? (
                      <>
                        <Edit onClick={(event: any) => handleEdit(event, product)} />
                        <Delete onClick={(event: any) => handleDelete(event, product.id)} />
                      </>
                    ) : renderPlaceButton(product.id)
                  }
                  
                </ActionContainer>
              </ProductListContainer>
            ))
          }
				</ProductListsWrapper>
      </ProductContainer>
		</Layout>
	)
}