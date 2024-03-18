import styled, { css } from 'styled-components';
import { CTAButton } from '@/libs/shared-components/callToAction/callToAction.style';
import { theme } from '@/libs/shared-components/theme/theme';

export const HeaderContainer = styled.div`
    padding: 20px;
    border-bottom: solid 2px #616161;
    background: linear-gradient(45deg, #302e2e, #33262e);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RightHandContainer = styled.div`
    display: flex;
    gap: 32px;

    @media (max-width: ${theme.breakpoint.tablet}px) {
        gap: 16px;
    }
`

export const UserComponent = styled.div`
    display: flex;
    flex-direction: column;
`

export const PostCallToAction = styled(CTAButton)`
    background: #0ac;

    @media (max-width: ${theme.breakpoint.tablet}px) {
        padding: 6px 10px;
    }

    @media (max-width: ${theme.breakpoint.mobile}px) {
        padding: 6px 6px;
    }
`
export const LogoutCallToAction = styled(CTAButton)`
    background: transparent;
`

