import styled from "styled-components";
import { PrimaryButton } from "../../../shared/components";
import { FC, useState } from "react";

const StyledPrimaryButton = styled(PrimaryButton)`
    width: 100%;
    transition: all .1s;
    align-self: center;
    &.active {
        background-color: transparent;
        border: 5px solid #7A12FF;
        border-block-color: transparent;
        width: 42px;
        border-radius: 50%;
        animation: rotating 1s linear .2s infinite;
        @keyframes rotating {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
`;
interface IActionButton  {
    onClick: () => void;
    label: string;
}
export const AuthActionButton: FC<IActionButton> = ({ onClick, label }) => {
    const [active, setActive] = useState(false);
    const clickHandler = async () => {
        setActive(true);
        await onClick();
        setActive(false);
    };
    return (<StyledPrimaryButton className={active ? 'active' : ''} onClick={clickHandler}>
        {active ? '' : label}
    </StyledPrimaryButton>);
}