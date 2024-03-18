import styled from "styled-components";
import { height, space } from "styled-system";
import { BoxProps } from "../theme/theme";

export const Input = styled.input<BoxProps>`
    ${space}
    max-width: 100%;
    ${height}
    border: 0.5px solid rgb(98, 98, 98);
    border-radius: 4px;
    padding: 10px 10px;
    font-size: 16px;
    &:hover, &:focus {
      outline: none
    }
`
