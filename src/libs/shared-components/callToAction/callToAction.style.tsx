import styled, { css } from "styled-components";
import { BoxProps } from "../theme/theme";

export const CTAButton = styled.button<BoxProps>`
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	cursor: pointer;
  width: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '50%'; // Half width for two inputs in one line
      case 'xs':
        return '20%';
      case '2xs':
        return '120px';
      // Adjusted width for xs size
      case 'lg':
        return '60%'; // Adjusted width for lg size
      default:
        return '100%'; // Full width
    }
  }};
  padding: ${(props) => {
    switch (props.size) {
      case 'sm':
      case 'xs':
        return '8px';
      case 'lg':
        return '16px';
      default:
        return '16px'; // Default padding
    }
  }};
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
	color: white;
	background: rgb(0, 51, 102);
	border-radius: 6px;
	border: solid 0.5px gray;
`