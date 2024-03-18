import styled from 'styled-components';
import { theme } from '@/libs/shared-components/theme/theme';

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh
    `
    
export const MainWrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    padding: 36px 108px;
    background: white;

    @media (max-width: ${theme.breakpoint.desktop}px) {
        padding: 30px 48px;
    }

    @media (max-width: ${theme.breakpoint.tablet}px) {
        padding: 24px 10px;
    }
`