import styled from "styled-components";
import { theme } from "@/libs/shared-components/theme/theme";

export const ProductContainer = styled.div<{isModalOpen: boolean }>`
  padding: 40px 108px
  display: flex;
  flex: 1;
  overflow-y: ${({ isModalOpen }) => (isModalOpen ? 'hidden' : 'initial')};
  z-indeex: 1;
`

export const ProductStatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`

export const ProductViewContainer = styled.ul`
  width: 253px;
  height: 45px;
  display: inline-flex;
  list-style: none;
  background-color: rgb(224, 226, 228);
  border-radius: 22px;
  padding: 1px;
  font-size: 14px;
`

export const ProductViewSwitchButton = styled.li<{isActive: boolean }>`
  border-radius: 21px;
  background-color: ${({ isActive }) => (isActive ? '#f7f7f7' : 'transparent')};
  outline: 0px;
  color: ${({ isActive }) => (isActive ? '#007Acc' : 'initial')};
  display: block;
  padding: 11px;
  width: 126px;
  height: 45px;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
`

export const ProductListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const ProductListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 0.5px solid rgb(168, 168, 168);
  border-radius: 6px;
  padding: 18px 10px;
  gap: 12px;
  cursor: pointer;
`

export const ProductListImage = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ProductContentContent = styled.p`
  width: 30%;
  margin: 0;
  font-size: 18px;
  line-height: 24px;
`
export const ProductPrice = styled.div`
  width: 20%;
  font-size: 32px;
  text-align: center;

  span:last-child {
    position: relative;
    font-size: 16px;
    top: -0.85em;
  }
`
export const ActionContainer = styled.div`
  width: 30%;
  margin-right: 30px;
  display: flex;
  justify-content: end;
  gap: 8px
`

export const ProductCountsText = styled.div`
  @media (max-width: ${theme.breakpoint.tablet}px) {
    display: none;
  }
`