import React, { useLayoutEffect, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { listDetail, origindata } from "./App";
import UserContainer from "./UserContainer";

const PostList = () => {
    const { userId } = useParams();
    const data = useRecoilValue(origindata);
    const [settingList, setSettingList] = useRecoilState(listDetail);

    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedList, setSelectedList] = useState([]);

    const makeList = data.filter((item) => {
        return item.userId === Number(userId);
    });
    useLayoutEffect(() => {
        if (makeList.length !== 0) {
            setSelectedList(makeList);
        }
    }, []);

    const clickButton = (idx) => {
        setSelectedIdx(idx);
    };

    const changeList = (idx) => {
        switch (idx) {
            case 0:
                const total = data.filter((item) => {
                    return item.userId === Number(userId);
                });
                setSelectedList(total);
                break;
            case 1:
                const completed = makeList.filter((item) => {
                    return item.completed === true;
                });
                setSelectedList(completed);
                break;
            case 2:
                const uncompleted = makeList.filter((item) => {
                    return item.completed === false;
                });
                setSelectedList(uncompleted);
                break;
        }
        setSettingList(makeList);
    };

    useLayoutEffect(() => {
        changeList(0);
    }, []);
    useEffect(() => {
        changeList(selectedIdx);
    }, [selectedIdx]);

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
            {settingList.map((item, idx) => {
                return (
                    <UserContainer
                        key={idx}
                        userId={item.id}
                        url="postdetail"
                        content={item.title}
                        prev={null}
                        next={null}
                    />
                );
            })}
        </>
    );
};
export default PostList;
