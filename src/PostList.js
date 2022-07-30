import React, { useLayoutEffect, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { listDetail, origindata } from "./App";
import UserContainer from "./UserContainer";

const PostList = () => {
    const { id } = useParams();
    const data = useRecoilValue(origindata);
    const [settingList, setSettingList] = useRecoilState(listDetail);

    const list = [];
    const dataList = data.map((item) => {
        if (item.userId === Number(id)) {
            list.push(item);
        }
        return list;
    });

    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedList, setSelectedList] = useState(list);

    const clickButton = (idx) => {
        setSelectedIdx(idx);
    };

    const changeList = (idx) => {
        switch (idx) {
            case 0:
                setSelectedList(list);
                break;
            case 1:
                const completed = list.filter((item) => {
                    return item.completed === true;
                });
                setSelectedList(completed);
                break;
            case 2:
                const uncompleted = list.filter((item) => {
                    return item.completed === false;
                });
                setSelectedList(uncompleted);
                break;
        }
        setSettingList(list);
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
            {selectedList.map((item, idx) => {
                return (
                    <UserContainer
                        key={idx}
                        userId={item.id}
                        mode="postdetail"
                        content={item.title}
                    />
                );
            })}
        </>
    );
};
export default PostList;
