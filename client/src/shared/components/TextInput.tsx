import React, { FC } from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
    border: none;
    border-bottom: 0.5px solid white;
    height: 30px;
    background: none;
    color: white;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    outline: none;
    width: 100%;
`;

// interface ITextInput extends HTMLInputElement {
//     // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }
// export const TextInput: FC<ITextInput> = (props) => {
//     const {
//         placeholder,
//         type,
//     } = props;

//     return <StyledTextInput />
// };

export const TextInput = StyledTextInput;
