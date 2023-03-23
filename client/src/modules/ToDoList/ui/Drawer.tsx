import { FC } from "react";
import { MdOutlineManageSearch } from "react-icons/md";

interface IDrawer {}
export const Drawer: FC<IDrawer> = () => {
    return <UserInfoBar />;
}

interface IUserInfoBar {}
const UserInfoBar: FC<IUserInfoBar> = () => {
    return (<div style={{
        backgroundColor: '#242443',
        padding: '27px 16px',
        borderBottom: '1px solid #7A12FF',
        borderRadius: '0px 0px 20px 20px',
        width: '300px',
        color: 'white',
    }}>
        <img width={40} style={{ borderRadius: '10px'}} src="/images/avatar.jpg" alt="avatar" />
        <label>Hello User</label>
        <label>Keep Plan for 1 Day</label>
        <div><MdOutlineManageSearch /></div>
    </div>);
}