import styled, { css } from 'styled-components';
import { ModalContent, InputContainer } from '../modal/modal.style';

export const BidModalContent = styled(ModalContent)`
    max-width: 380px;
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        text-align: left;
        font-weight: 500;
    }
`

export const ModalBody = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
` 

export const ModalFooter = styled.div`
    padding: 24px 0;
    display: flex;
    justify-content: end;
    widht: 100%;
`

export const BidInputContainer = styled(InputContainer)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`