import { CTAButton } from "./callToAction.style";
import { Box } from "../theme/theme";

export function CallToAction({ onClick, label, padding, ...buttonProps }: any) {
    return (
      <CTAButton onClick={onClick} {...buttonProps}>
        <Box as={'span'}>{ label }</Box>
      </CTAButton>
    )
}