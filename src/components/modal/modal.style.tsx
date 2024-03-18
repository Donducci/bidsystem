import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background: #dadadaa8;
`

export const ModalContent = styled.div`
    width: 100%;
    max-width: 780px;
    padding: 12px 24px;
    border: solid 1px #dadadaa8;
    border-radius: 6px;
    background: white;
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

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(50% - 8px);
    gap: 12px;
`