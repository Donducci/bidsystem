import React, { useEffect, useState } from 'react';
import { BidListContainer, UserImageWrapper, UserInfoWrapper, PriceWrapper, QuantityWrapper, StatusWrapper, BidStatus, Divider } from "./bidList.style";
import User from '@/libs/icons/user';
import { Actionbutton, ActionContainer } from './bidList.style';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getBidsLists } from '@/store/bidSlice';
import { updateBid, deleteBid } from '@/pages/api';
import BidModal from '@/components/bidModal';
import { useAppDispatch } from '@/libs/utils/hook';
import { RootState } from '@/store/store';

export default function BidList({ user }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;  

  const [bidList, setBidList] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  const bids = useSelector((state: RootState) => state.bid.bids.bid);
  const status = useSelector((state: RootState) => state.bid.isLoading);
  const isSuccessed = useSelector((state: RootState) => state.bid.isSuccessed);
  
  const toggleBidModal = () => {
    setIsBidModalOpen(!isBidModalOpen);
  }
    
 const handleChangeStatus = (status: string, bidId: number | null) => {
  if (bidId === null) {
    console.error('Bid ID is invalid');
    return;
  }

  const bidStatus = { status: status };
  updateBid(bidId, bidStatus).then(() => {
    if (typeof bidId === 'number') {
      dispatch(getBidsLists(bidId));
    }
  });
};
  
  const handleChangeBid = (bid: number) => {
    setSelectedBid(bid);
    toggleBidModal();
  }

  const handleCancelBid = (bidId: number) => {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : NaN;
    
    deleteBid(bidId).then(() => {
      dispatch(getBidsLists(numericId));
    });
  }

  const handleUpdateBid = (bidId: number, updateData: { price: string; stocks: string }) => {
  const bidData = {
    price: Number(updateData.price),
    stocks: Number(updateData.stocks),
  };

  const numericId = typeof id === 'string' ? parseInt(id, 10) : NaN;

  if (!isNaN(numericId)) {
    updateBid(bidId, bidData).then(() => {
      dispatch(getBidsLists(numericId));
      toggleBidModal();
    });
  } else {
    console.error("Invalid 'id'.");
  }
};

  useEffect(() => {
    const bidId = typeof id === 'string' ? parseInt(id, 10) : NaN;

    if (!status && !isNaN(bidId)) {
      dispatch(getBidsLists(bidId));
    }
  }, [dispatch, id, status]);

  useEffect(() => {
    if (isSuccessed && bids) {
      setBidList(bids);
    }
  }, [isSuccessed, dispatch]);

   useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    setUserData(decoded);
   }, [])

    return (
        <>
        <BidStatus>{`${bidList ? bidList.length : '0'} users are bidding on this product`}</BidStatus>
        {isBidModalOpen && <BidModal toggleModal={toggleBidModal} handleUpdateBid={handleUpdateBid} selectedBid={selectedBid} />}

            {
                bidList && (bidList.length > 0) && bidList.map((bid, index) => (
            <React.Fragment key={index}>
                <BidListContainer>
                <UserImageWrapper>
                    <User />
                </UserImageWrapper>
                <UserInfoWrapper>
                    <span>{bid.user.name}</span>
                </UserInfoWrapper>
                <PriceWrapper>
                    <span>${bid.price}</span>
                </PriceWrapper>
                <QuantityWrapper>
                    <span>{bid.stocks}{` (Qty)`}</span>
                </QuantityWrapper>
                <StatusWrapper>{bid.status}</StatusWrapper>
                <ActionContainer>
                  {
                    user && bid.status === "pending" &&  (
                      <>
                        <Actionbutton onClick={() => handleChangeStatus('accepted', bid.id)}>Accept</Actionbutton>
                        <Actionbutton onClick={() => handleChangeStatus('rejected', bid.id)}>Reject</Actionbutton>
                      </>
                    )
                  }
                  {
                    userData.id === bid.userId && bid.status === "pending" &&  (
                      <>
                        <Actionbutton onClick={() => handleChangeBid(bid)}>Edit</Actionbutton>
                        <Actionbutton onClick={() => handleCancelBid(bid.id)}>Cancel</Actionbutton>
                      </>
                    )
                  }
                </ActionContainer>
            </BidListContainer>
            <Divider />
        </React.Fragment>
        ))
        }
      </>
    )
}