import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { login, registration } from '../thunks';
import { FlexContainer, PrimaryButton, SecondaryButton, TextInput, Text } from '../../../shared/components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    return (<>
        <FlexContainer $direction="column" $alignSelf="center" $justifyContent="center" style={{flex: 1}}>
            <FlexContainer $margin='0 0 30px' $alignSelf="center" $width={290}>
                <TextInput 
                    value={email}
                    onChange={handleChangeEmail}
                    required
                    label="Email"
                />
            </FlexContainer>
            <FlexContainer $margin='0 0 30px' $alignSelf="center" $width={290}>
                <TextInput
                    type='password'
                    value={password}
                    onChange={handleChangePassword}
                    required
                    label="Password"
                />
            </FlexContainer>
            <PrimaryButton onClick={onSignIn}>Sign In</PrimaryButton>
        </FlexContainer>
        <FlexContainer $alignSelf='center' $padding='0 0 18px'>
            <Text>Don't have an account yet? <Link to='/sign-up' style={{ color: 'white', fontWeight: 'bold'}}>Sign up</Link></Text>
        </FlexContainer>
    </>);
};

export default LoginForm;
