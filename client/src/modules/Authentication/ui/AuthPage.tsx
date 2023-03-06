import { FC } from "react";
import { LoginFormView } from "..";
import { FlexContainer } from "../../../shared/components";

interface IAuthPage {}
export const AuthPage: FC<IAuthPage> = () => {
    const styles = {
        justifyContent: 'center',
        height: '100%'
    };
    return (<FlexContainer style={styles}>
        <div style={{
            flex: 1,
            height: '100%',
            backgroundImage: 'url(./login_bg.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}></div>
        <FlexContainer style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <LoginFormView />
        </FlexContainer>
    </FlexContainer>);
};