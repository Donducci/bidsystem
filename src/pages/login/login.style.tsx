import styled, { css } from 'styled-components';

export const SignInOverlay = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 480px;
    border: sold 1px gray;
    border-radius: 12px;
    padding: 32px 36px;
    background: white;
`

export const SignInHeader = styled.p`
    text-align: center;
    font-size: 36px;
    font-weight: semibold;
    margin: 0;
`

export const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
`

export const ButtonWrapper = styled.div`
    width: 100%;
    margin-bottom: 40px;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

export const Label = styled.span`
    padding: 4px 0;
`