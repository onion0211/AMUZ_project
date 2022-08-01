import React from "react";
import { useRecoilValue } from "recoil";
import { origindata } from "../App";
import UserContainer from "../Component/UserContainer";

const UserList = () => {
    const data = useRecoilValue(origindata);

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
            <div>user 총 개수 : {user.length}</div>
            {user.map((item, idx) => {
                return (
                    <UserContainer
                        key={idx}
                        url={"/postlist/" + item}
                        content={item}
                        userId={item}
                    ></UserContainer>
                );
            })}
        </>
    );
};
export default UserList;
