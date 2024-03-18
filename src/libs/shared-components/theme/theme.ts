import styled from 'styled-components';
import {
  alignItems,
  AlignItemsProps,
  BackgroundProps,
  border,
  BorderProps,
  bottom,
  color,
  ColorProps,
  DisplayProps,
  flexbox,
  flexDirection,
  FlexDirectionProps,
  fontSize,
  FontSizeProps,
  fontStyle,
  FontStyleProps,
  fontWeight,
  FontWeightProps,
  justifyContent,
  JustifyContentProps,
  layout,
  LayoutProps,
  left,
  position,
  PositionProps,
  right,
  space,
  SpaceProps,
  top,
  zIndex,
  maxWidth,
  OrderProps,
  flex,
  width,
  FlexProps,
  AlignSelfProps,
  alignSelf,
  flexWrap,
  FlexWrapProps,
  HeightProps,
} from 'styled-system';

export interface BoxProps
  extends SpaceProps,
    OrderProps,
    LayoutProps,
    ColorProps,
    HeightProps,
    FontSizeProps,
    FontStyleProps,
    FontWeightProps,
    DisplayProps,
    AlignItemsProps,
    BorderProps,
    JustifyContentProps,
    FlexDirectionProps,
    PositionProps,
    FlexProps,
    AlignSelfProps,
    BackgroundProps,
    FlexWrapProps {}

export const theme = {
  // 360px (mobile) | 768px (tablet) | 1024px (desktop/tablet landscape) | 1440px (macbook) | 1231px (big screens)
  //  breakpoints: ['767px', '1231px'],
  breakpoint: {
    mobile: 360,
    tablet: 768,
    desktop: 1024,
    macbook: 1440,
    largeScreen: 1231,
  },
  gutterWidth: {
    xsmall: 16,
    small: 24,
    medium: 64,
  },
  containerMargin: {
    xsmall: 20,
    small: 36,
    medium: 68,
    large: 108,
    xlarge: 156,
  },
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256],
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 34, 36, 48, 80, 96],
  fonts: {
    body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  sizes: [16, 32, 64, 128, 256],
  colors: {
    coreBlue: '#003366',
    lightBlue: '#33adff',
    lightGrey: '#F8FAFC',
    coreCyan: '#CDEBFE',
    neutralDarkGrey: '#626262',
    neutralDarkerGrey: '#3F3F3F',
    neutralWhite: '#FFFFFF',
    tintsCoreCyan: '#9BD7FD',
    aliceBlueCyan: '#E7F4FF',
    dodgerBlueCyan: '#0099FF',
    pastelBlueCyan: '#007ACC',
    mistyRose: '#FAE0E6',
    orange: '#FF6600',
    neutralMidGrey: '#BCBCBC',
    neutralGrey: '#E0E2E4',
    staleGrey: '#1a181f1a',
    semanticRed: '#CC0935',
    semanticDarkRed: '#A3072A',
    neutralLighterGrey: '#F0F2F4',
    neturalMidDarkGrey: '#A8A8A8',
    neturalBlack: '#282828',
    semanticGreen: '#007D32',
    lightGreen: '#66CC33',
    tintCoreGreen: '#E1F4D7',
    tintDarkCyan: '#007ACC',
    semanticBlue: '#0079AD',
    highlightPurple: '#990099',
  },
  radii: [0, 2, 4, 8, 16, 9999, '100%'],
};

export const Box = styled.div<BoxProps>`
  ${space}
  ${color} 
  ${layout}
  ${flexbox}
  ${fontSize}
  ${fontStyle}
  ${fontWeight}
  ${alignItems}
  ${border}
  ${flexDirection}
  ${justifyContent}
  ${position}
  ${left}
  ${right}
  ${top}
  ${bottom}
  ${zIndex}
  ${maxWidth}
  ${flex}
  ${flexWrap}
  ${width}
  ${alignSelf}
  ${position}
`;
