import { FC, useState } from "react";
import { FlexContainer, PrimaryButton, Text, TextInput } from "../../../shared/components";
import { Link } from "react-router-dom";

export const SignUpForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const setConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    return (<>
    <FlexContainer $direction="column" $alignSelf="center" $justifyContent="center" style={{flex: 1}}>
        <FlexContainer $margin='0 0 30px' $alignSelf="center" $width={290}>
            <TextInput
                label="Email"
                value={email}
                onChange={setEmailHandler}
                required
            />
        </FlexContainer>
        <FlexContainer $margin='0 0 30px' $alignSelf="center" $width={290}>
            <TextInput
                label="Password"
                type="password"
                value={password}
                onChange={setPasswordHandler}
                required
            />
        </FlexContainer>
        <FlexContainer $margin='0 0 30px' $alignSelf="center" $width={290}>
            <TextInput
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPasswordHandler}
                required
            />
        </FlexContainer>
        <PrimaryButton onClick={() => {}}>Sign Up</PrimaryButton>
    </FlexContainer>
    <FlexContainer $alignSelf='center' $padding='0 0 18px'>
        <Text>Have an account already? <Link to='/login' style={{ color: 'white', fontWeight: 'bold'}}>Log in</Link></Text>
    </FlexContainer>
</>);
}