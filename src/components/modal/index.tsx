import React, { useRef, useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { ModalContainer, ModalContent, ModalHeader, ModalFooter, ModalBody, InputContainer } from './modal.style';
import FormInput from '@/libs/shared-components/form-input/form-input';
import { FormContainer } from '@/pages/login/login.style';
import { Label } from '@/pages/login/login.style';
import { CallToAction } from '@/libs/shared-components/callToAction/callToAction';
import Times from '@/libs/icons/times';

const ModalMockData = [
    {
        type: 'leftFields', components: [
            { type: 'text', label: 'name' },
            { type: 'number', label: 'stocks' },
            { type: 'text', label: 'price' },
        ]
    },
    {
        type: 'rightFields', components: [
            { type: 'textarea', label: 'description'}
        ]
    }
];

interface Product {
  id: number;
  name: string;
  description?: string;
  stocks: number;
  price: number;
}

interface ModalProps {
  toggleModal: () => void;
  selectedProduct?: Product;
  handleSave: (data: FormData) => void;
  handleUpdate?: (formData: FormData, id?: number) => void;
}

interface FormData {
  name: string;
  description: string;
  stocks: number;
  price: number;
}

const Modal: React.FC<ModalProps> = ({ toggleModal, selectedProduct, handleSave, handleUpdate }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

 const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    stocks: 0,
    price: 0,
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || '',
        stocks: Number(selectedProduct.stocks) || 0,
        price: Number(selectedProduct.price) || 0,
        description: selectedProduct.description || ''
      });
    }
  }, [selectedProduct]);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    let updatedValue: string | number = value;
    
    if (name === 'price' || name === 'stocks') {
      updatedValue = value === '' ? 0 : Number(value);
    }
    
    setFormData(prevState => ({
        ...prevState,
        [name]: updatedValue,
    }));
};

  const actionHandler = () => {
  // No need to check for empty strings since values are ensured to be numbers
  const dataToSaveOrUpdate = { ...formData };

  if (selectedProduct) {
    handleUpdate(dataToSaveOrUpdate, selectedProduct.id);
  } else {
    handleSave(dataToSaveOrUpdate);
  }
};

  const rendererFormController = () => {
    return ModalMockData.flatMap((parentField, iIndex) => (
      <InputContainer key={iIndex}>
        {
          parentField.components.map((item, index) => {
            const isTextArea = item.type === 'textarea';
            return (
              <FormContainer key={index}>
                <Label>{item.label}</Label>
                <FormInput
                  as={isTextArea ? 'textarea' : undefined}
                  rows={isTextArea ? 6 : undefined}
                  type={item.type}
                  label={item.label}
                  name={item.label}
                  value={formData[item.label as keyof FormData]}
                  onChange={handleInputChange}
                />
              </FormContainer>
            );
          })
        }
      </InputContainer>
    ));
  };

 const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      toggleModal();
    }
  };

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <ModalContent ref={modalContentRef}>
        <ModalHeader>
          <h1>{selectedProduct ? "Update Product" : "Post Product"}</h1>
          <Times onClick={toggleModal} />
        </ModalHeader>
        <ModalBody>
          {rendererFormController()}
        </ModalBody>
        <ModalFooter>
          <CallToAction size="xs" label={selectedProduct ? "UPDATE" : "SAVE"} onClick={actionHandler} />
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}

export default Modal;

