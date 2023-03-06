import styled from "styled-components";

interface IBaseButtonStyles {
    readonly $disabled?: boolean;
}

const ButtonBase = styled.button<IBaseButtonStyles>`
    position: relative;
    overflow: hidden;
    color: white;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    box-sizing: border-box;
    display: flex;
    height: 42px;
    border: none;
    padding: 0 1em;
    align-items: center;
    justify-content: center;
    min-width: 89px;
    max-width: 120px;
    border-radius: 10px;
    cursor: ${props => props.$disabled ? 'disabled' : 'pointer'};
`;
// TODO: add ripple effect
// const SpanRipple = styled.span`
//     position: absolute;
//     border-radius: 50%;
//     transform: scale(0);
//     animation: ripple 600ms linear;
//     background-color: rgba(255, 255, 255, 0.7);
// `;

export const PrimaryButton = styled(ButtonBase)`
    background: #7A12FF;
    &:active {
        background-color: #8b38f8;
    }
`;

export const SecondaryButton = styled(ButtonBase)`
    background: #1A1A2F;
    border: 1px solid #7A12FF;
    &:active {
        background-color: #2d2d45;
    }
`;