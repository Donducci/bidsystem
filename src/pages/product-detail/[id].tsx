import React, { useState, useEffect } from 'react';
import Layout from "@/layout/layout";
import BidList from './components/bid-list/bidList';
import ProductDetail from './components/product-detail/productDetail';
import { Container } from './product-detail.style';
import DoubleArrow from '@/libs/icons/doubleArrow';
import { Breadcrumb } from './product-detail.style'; 
import { useRouter } from 'next/router';
import { getBidsLists } from '@/store/bidSlice';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { RootState } from '@/store/store';
import { useAppDispatch } from '@/libs/utils/hook';

export default function ProductDetailPage() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const router = useRouter();
  const { id } = router.query;  

  const [bidList, setBidList] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [userData, setUserData] = useState(null);
  

  const bids = useSelector((state: RootState) => state.bid.bids.bid);
  const collection = useSelector((state: RootState) => state.bid.bids.collection);
  const status = useSelector((state: RootState) => state.bid.isLoading);
  const isSuccessed = useSelector((state: RootState) => state.bid.isSuccessed);

  const handleGotoHome = () => {
    push('/home');
  }

  useEffect(() => {
    if (!status && id) {
      dispatch(getBidsLists(id));
    }
  }, [dispatch, id])

  useEffect(() => {
    if (isSuccessed && bids) {
      setBidList(bids);
      setCollectionData(collection[0]);
    }
  }, [isSuccessed, dispatch]);

   useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    setUserData(decoded);
   }, [])
  
  return (
    <Layout>
      <Container>
        <Breadcrumb>
          <span onClick={handleGotoHome}>{`Home`} </span>
          <DoubleArrow />
          <span>{`Detail`} </span>
        </Breadcrumb>
        <ProductDetail collectionData={collectionData} />
        <BidList bidList={bidList} user={collection && collection.length > 0 && userData ? collection[0].userId === userData.id : false} />
      </Container>
    </Layout>
  )
}