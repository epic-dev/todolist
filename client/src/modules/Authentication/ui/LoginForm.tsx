import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { login, registration } from '../thunks';
import { FlexContainer, PrimaryButton, SecondaryButton, TextInput } from '../../../shared/components';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector(state => state.auth);

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    
    const onSignIn = () => {
        // dispatch(login(email, password));
        // navigate('/todos');
    }
    const onSignUp = () => {
        // dispatch(registration(email, password));
    }

    return (<FlexContainer $direction="column" $alignSelf="center">
        <TextInput 
            placeholder='Email'
            value={email}
            onChange={handleChangeEmail}
        />
        <TextInput type='password' value={password} onChange={handleChangePassword} />
        <PrimaryButton onClick={onSignIn}>Sign In</PrimaryButton>
        
        <SecondaryButton onClick={onSignUp}>Sign Up</SecondaryButton>


    </FlexContainer>);
};

export default LoginForm;
