import React, { FC } from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
    border: none;
    height: 30px;
    background: transparent;
    color: white;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    outline: none;
    width: 100%;

    &:focus ~ label,
    &:valid ~ label {
        top: -5px;
    }
    /* does not work with type='email' */
    &:not(input:empty) ~ label {
        top: -5px;
    }
`;
const StyledLabel = styled.label`
    position: absolute;
    transition: .5s;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #A1A1C1;
    pointer-events: none;
`;
const Wrapper = styled.div`
    position: relative;
    border-bottom: 0.5px solid white;
    width: 100%;
`

interface ITextInput extends React.HTMLProps<HTMLInputElement> {
    label?: string;
}
export const TextInput: FC<ITextInput> = (props) => {
    const {
        required,
        type = 'text',
        onChange,
        label,
    } = props;

    return <Wrapper>
            <StyledTextInput
                type={type}
                required={required}
                onChange={onChange}
            />
            <StyledLabel>{label}</StyledLabel>
        </Wrapper>
};
