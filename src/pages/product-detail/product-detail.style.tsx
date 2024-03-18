import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 120px 0;
    width: 100%;
`

export const Breadcrumb = styled.div`
    display: flex;
    justify-content: start;
    align-items:center;
    gap: 4px;
    padding-bottom: 24px;
    
    span:first-child {
        cursor: pointer;
    }
`

