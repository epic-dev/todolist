import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

interface IStyledSpan {
    readonly $size?: string; // TODO: check value to contain units
    readonly $color?: string;
}
const StyledSpan = styled.span<IStyledSpan>`
    font-family: 'Roboto';
    font-size: ${props => props.$size};
    color: ${props => props.$color ?? 'white'};
`

interface IText extends PropsWithChildren, IStyledSpan {
    label?: string;
}
export const Text: FC<IText> = (props) => {
    const {
        label,
        $color,
        $size,

        children,
    } = props;
    return (<StyledSpan
        $color={$color}
        $size={$size}
    >{children ? children : label}</StyledSpan>)
}