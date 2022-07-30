import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listDetail } from "./App";
import UserContainer from "./UserContainer";

const PostDetail = () => {
    const { id } = useParams();
    const list = useRecoilValue(listDetail);
    const [selectedIdx, setSelectedIdx] = useState(Number(id));

    const selectedListId = list.map((item) => {
        return item.id;
    });

    const selectedItem = list.find((item) => {
        return item.id === selectedIdx;
    });

    const prevItem = list.find((item) => {
        return item.id === selectedIdx - 1;
    });
    const nextItem = list.find((item) => {
        return item.id === selectedIdx + 1;
    });

    const prev = () => {
        if (selectedIdx !== selectedListId[0]) {
            setSelectedIdx(selectedIdx - 1);
        }
    };
    const next = () => {
        if (selectedIdx !== selectedListId[selectedListId.length - 1]) {
            setSelectedIdx(selectedIdx + 1);
        }
    };

    return (
        <>
            <h3 className="title">User List</h3>
            <h3>{selectedIdx}번 Detail</h3>
            <h3>{selectedItem.title}</h3>
            <UserContainer content={selectedItem.title + "입니다."} mode="no" />
            <>
                {typeof prevItem !== "undefined" && (
                    <button
                        className="buttonS"
                        onClick={() => {
                            prev();
                        }}
                    >
                        {prevItem.title + " 이전글"}
                    </button>
                )}
                {typeof nextItem !== "undefined" && (
                    <button
                        className="buttonS"
                        onClick={() => {
                            next();
                        }}
                    >
                        {nextItem.title + " 다음글"}
                    </button>
                )}
            </>
        </>
    );
};
export default PostDetail;
