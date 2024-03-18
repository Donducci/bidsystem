import { useRef, useState } from 'react';
import { ModalContainer, ModalContent, ModalHeader, ModalFooter, ModalBody } from '../modal/modal.style';
import { BidModalContent, BidInputContainer } from './bidModal.style';
import FormInput from '@/libs/shared-components/form-input/form-input';
import { FormContainer } from '@/pages/login/login.style';
import { Label } from '@/pages/login/login.style';
import { CallToAction } from '@/libs/shared-components/callToAction/callToAction';
import Times from '@/libs/icons/times';

interface SelectedBid {
  id: number;
  price: number;
  stocks: number;
}

interface SelectedProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
}

interface BidModalProps {
  toggleModal: () => void;
  handleBidApply: (data: FormData) => void;
  selectedBid?: SelectedBid; 
  selectedProduct?: SelectedProduct; 
  handleUpdateBid?: (id: number, data: FormData) => void;
}

// Define the interface for the form data
interface FormData {
  price: number;
  stocks: number;
  status: string;
  collectionId: SelectedProduct | null;
}

const BidModal: React.FC<BidModalProps> = ({ toggleModal, handleBidApply, selectedBid, selectedProduct, handleUpdateBid }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    price: selectedBid?.price || 0,
    stocks: selectedBid?.stocks || 0,
    status: '',
    collectionId: selectedProduct || null,
  });

  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      toggleModal();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = event.target;
    
    const updatedValue = (name === 'price' || name === 'stocks') ? Number(value) : value;

    setFormData(prevState => ({
        ...prevState,
        [name]: updatedValue,
    }));
  };

  const actionHandler = () => {
    const submitData = {
      ...formData,
      price: Number(formData.price),
      stocks: Number(formData.stocks),
      status: 'pending'
    };
    handleBidApply(submitData);
  };

  const actionUpdateHandler = () => {
    if (!selectedBid || !handleUpdateBid) return;
    const submitData = {
      ...formData,
      price: Number(formData.price),
      stocks: Number(formData.stocks),
      status: 'pending'
    };
    handleUpdateBid(selectedBid.id, submitData);
  }

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <BidModalContent ref={modalContentRef}>
        <ModalHeader>
          <h1>Place Bid</h1>
          <Times onClick={toggleModal} />
        </ModalHeader>
        <ModalBody>
          <BidInputContainer>
            <FormContainer>
              <Label>Price</Label>
              <FormInput name="price" type="number" value={formData.price} onChange={handleInputChange} />
            </FormContainer>
            <FormContainer>
              <Label>Stocks</Label>
              <FormInput name="stocks" type="number" value={formData.stocks} onChange={handleInputChange} />
            </FormContainer>
          </BidInputContainer>
        </ModalBody>
        <ModalFooter>
          <CallToAction size="xs" label="APPLY" onClick={selectedBid ? actionUpdateHandler : actionHandler} />
        </ModalFooter>
      </BidModalContent>
    </ModalContainer>
  );
}

export default BidModal;

