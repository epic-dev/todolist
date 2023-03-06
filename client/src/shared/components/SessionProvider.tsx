import { FC, PropsWithChildren, createContext, useContext } from "react";

interface ISessionProvider extends PropsWithChildren {}
interface ISessionContext {
    // TODO: sign up, sign up with social networks
}
const SessionContext = createContext<ISessionContext>({});
const useSessionContext = () => {
    // TODO: declare session related functions or state
    return {};
};

const SessionProvider: FC<ISessionProvider> = ({ children }) => {
    const session = useSessionContext();
    return <SessionContext.Provider value={session}>
        { children }
    </SessionContext.Provider>
}
export const useAppSessionCtx = () => {
    return useContext(SessionContext);
}
export default SessionProvider;