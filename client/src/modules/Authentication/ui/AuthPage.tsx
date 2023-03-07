import { FC } from "react";
import { LoginFormView } from "..";
import { FlexContainer } from "../../../shared/components";
import { SignUpForm } from "./SignUpForm";
import { useLocation } from "react-router-dom";

interface IAuthPage {}
export const AuthPage: FC<IAuthPage> = () => {
    const styles = {
        justifyContent: 'center',
        height: '100%'
    };

    const { pathname } = useLocation();

    return (<FlexContainer style={styles}>
        <FlexContainer style={{
            flex: 1,
            backgroundImage: 'url(./login_bg.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}></FlexContainer>
        <FlexContainer style={{ flex: 1 }} $direction="column">
            {
                pathname === '/login'
                ? <LoginFormView />
                : null
            }
            {
                pathname === '/sign-up'
                ? <SignUpForm />
                : null
            }
        </FlexContainer>
    </FlexContainer>);
};