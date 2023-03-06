import styled from "styled-components";

interface IFlexContainerStyles {
    readonly $width?: number;
    readonly $direction?: string;
    readonly $alignSelf?: "center" | "start" | "end";
}

export const FlexContainer = styled.div<IFlexContainerStyles>`
    display: flex;
    width: ${props => props.$width};
    flex-direction: ${props => props.$direction}
`;