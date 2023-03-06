import { FC } from "react"
import styled from "styled-components"

interface IEnvironmentLabelStyles {
    readonly $display: boolean;
    readonly $label: string;
}

const StyledDiv = styled.div<IEnvironmentLabelStyles>`
    position: fixed;
    overflow: hidden;
    right: 0;
    top: 0;
    z-index: 9999;
    display: ${prop => prop.$display ? 'block' : 'none'};
    
    width: 6em;
    height: 6em;

    &:before, &:after {
        position: absolute;
        display: block;
        transform: rotate(45deg);
        box-sizing: content-box;
        width: 15em;
        height: 1.5em;
        right: -3.3em;
        top: 3.3em;
        text-align: center;
    }
    &:before {
        content: "";
    }
    &:after {
        content: "${prop => prop.$label}";
        color: white;
        font-weight: bold;
        font-size: 10px;
        background: #ff8d3b;
    }
`;

interface IEnvironmentLabel {
    display: boolean;
    env?: string;
}

export const EnvironmentLabel: FC<IEnvironmentLabel> = ({ display, env = 'development' }) => {
    return <StyledDiv $display={display} $label={env}></StyledDiv>
}