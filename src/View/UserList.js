import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { origindata, userData } from "../Component/Atom";
import UserContainer from "../Component/UserContainer";
import Loading from "../Component/Loading";

const UserList = () => {
    const [userdata, setUserdata] = useRecoilState(userData);
    const [loading, setLoading] = useState(null);

    const mainApi = async () => {
        try {
            setLoading(true);
            await axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                setUserdata(res.data);
            });
        } catch (e) {
            console.debug("error");
        }
        setLoading(false);
    };

    useEffect(() => {
        mainApi();
    }, []);

    return (
        <>
            {loading ? <Loading /> : <></>}
            <h3 className="title">User List</h3>
            <div style={{ marginBottom: "15px" }}>user 총 개수 : {userdata.length}</div>
            <UserContainer type="userList" list={JSON.stringify(userdata)} />
        </>
    );
};
export default UserList;
