import styled from "styled-components";

export const BidListContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
`

export const UserImageWrapper = styled.div`
    width:10%;
`

export const UserInfoWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
`

export const PriceWrapper = styled.div`
    width: 20%;
    display: flex;
`
export const QuantityWrapper = styled.div`
    width: 20%;
    display: flex;
`

export const StatusWrapper = styled.div`
    width: 10%
    display: flex;
    justify-content: end;
`

export const Divider = styled.div`
    width: 100%;
    padding: 15px;
    margin-bottom: 30px;
    border-bottom: solid 0.5px rgb(224, 226, 228);
`
export const BidStatus = styled.p`
    font-size 18px;
    padding: 12px 0;
    margin: 48px 0 30px 0;
    border-bottom: solid 0.5px rgb(224, 226, 228);
`

export const ActionContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: end;
    gap: 12px;
`

export const Actionbutton = styled.button`
    padding: 12px 16px;
    background: white;
    color:  rgb(0, 51, 102);
    border: solid 1px rgb(0, 51, 102);
    border-radius: 8px;
    cursor: pointer;
`