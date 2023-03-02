import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { login, registration } from '../thunks';

const EmailInput = styled.input`
    border-radius: 3px;
    border: 1px solid;
`;
const PasswordInput = styled.input`
    border-radius: 3px;
    border: 1px solid;
`;

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
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
        dispatch(login(email, password));
    }
    const onSignUp = () => {
        dispatch(registration(email, password));
    }
    return (
        <>
        <EmailInput type='text' value={email} onChange={handleChangeEmail} />
        <PasswordInput type='password' value={password} onChange={handleChangePassword} />
        <button onClick={onSignIn}>Sign In</button>
        <button onClick={onSignUp}>Sign Up</button>
        {
            isAuthenticated && <div>{user?.email}</div>
        }
        </>
    );
};

export default LoginForm;
