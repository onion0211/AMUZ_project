import axios from "axios";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { listDetail, origindata } from "../App";
import UserContainer from "../Component/UserContainer";
import Loading from "../Component/Loading";

export const commentList = atom({
    key: "commentList",
    default: [],
});

const PostList = () => {
    const { userId } = useParams();
    const data = useRecoilValue(origindata);
    const [list, setList] = useRecoilState(listDetail);

    const userList = data.filter((item) => {
        return item.userId === Number(userId);
    });
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedList, setSelecetedList] = useState([]);

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

    const [comment, setComment] = useRecoilState(commentList);
    const [loading, setLoading] = useState(null);
    const commentApi = async () => {
        try {
            setLoading(true);
            await axios
                .get("https://jsonplaceholder.typicode.com/comments?postId=1")
                .then((res) => {
                    setComment(res.data);
                });
        } catch (e) {
            console.debug("error");
        }
        setLoading(false);
    };
    console.log("postList comment", comment);

    useLayoutEffect(() => {
        commentApi();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
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
