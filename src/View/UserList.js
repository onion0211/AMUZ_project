import React from "react";
import { useRecoilValue } from "recoil";
import { origindata, userData } from "../App";
import UserContainer from "../Component/UserContainer";
import JnE from "../Image/JnE.jpeg";

const UserList = () => {
    const data = useRecoilValue(origindata);
    const userdata = useRecoilValue(userData);

    let user = [];
    const userList = data.map((item) => {
        if (!user.includes(item.userId)) {
            user.push(item.userId);
        }
        return user;
    });

    return (
        <>
            <h3 className="title">User List</h3>
            <div style={{ marginBottom: "15px" }}>user 총 개수 : {user.length}</div>
            <UserContainer type="userList" list={JSON.stringify(userdata)} />
        </>
    );
};
export default UserList;
