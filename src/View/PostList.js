import axios from "axios";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { listDetail, origindata } from "../Component/Atom";
import UserContainer from "../Component/UserContainer";
import Loading from "../Component/Loading";

const PostList = () => {
    const { userId } = useParams();
    const [data, setData] = useRecoilState(origindata);
    const [list, setList] = useRecoilState(listDetail);

    const [loading, setLoading] = useState(null);
    const postApi = async () => {
        try {
            setLoading(true);
            await axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
                setData(res.data);
            });
        } catch (e) {
            console.debug("error");
        }
        setLoading(false);
    };

    useEffect(() => {
        postApi();
    }, []);

    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedList, setSelecetedList] = useState([]);

    const userList = data.filter((item) => {
        return item.userId === Number(userId);
    });

    useLayoutEffect(() => {
        setSelecetedList(userList);
        setList(userList);
    }, [data]);

    const clickButton = (idx) => {
        setSelectedIdx(idx);
    };

    const changeList = (idx) => {
        switch (idx) {
            case 0:
                setSelecetedList(userList);
                break;
            case 1:
                const completed = list.filter((item) => {
                    return item.completed === true;
                });
                setSelecetedList(completed);
                break;
            case 2:
                const uncompleted = list.filter((item) => {
                    return item.completed === false;
                });
                setSelecetedList(uncompleted);
                break;
        }
        setList(userList);
    };

    useEffect(() => {
        changeList(selectedIdx);
    }, [selectedIdx]);

    return (
        <>
            {loading ? <Loading /> : <></>}
            <h3 className="title">Post List</h3>
            <>
                <button className="buttonS" onClick={() => clickButton(0)}>
                    전체
                </button>
                <button className="buttonS" onClick={() => clickButton(1)}>
                    완성
                </button>
                <button className="buttonS" onClick={() => clickButton(2)}>
                    미완성
                </button>
                <u>post 개수 {selectedList.length}</u>
            </>
            <UserContainer type="postList" list={JSON.stringify(selectedList)} userId={userId} />
        </>
    );
};
export default PostList;
