import React, { useLayoutEffect, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listDetail, origindata } from "../App";
import UserContainer from "../Component/UserContainer";

const PostDetail = () => {
    const { userId, itemId } = useParams();
    const data = useRecoilValue(origindata);
    const [selectedIdx, setSelectedIdx] = useState(Number(itemId));
    const [selectedItem, setSelectedItem] = useState({});
    const [prevItem, setPrevItem] = useState({});
    const [nextItem, setNextItem] = useState({});

    const userList = data.filter((item) => {
        return item.userId === Number(userId);
    });

    useEffect(() => {
        setSelectedIdx(Number(itemId));
    }, [userId, itemId]);

    const item = userList.find((item) => {
        return item.id === selectedIdx;
    });

    useEffect(() => {
        setSelectedItem(item);
    }, [userId, itemId]);

    // const prevItem = userList.find((item) => {
    //     return item.id === selectedIdx - 1;
    // });

    // const nextItem = userList.find((item) => {
    //     return item.id === selectedIdx + 1;
    // });

    useEffect(() => {
        setSelectedItem(
            userList.find((item) => {
                return item.id === selectedIdx;
            })
        );
        setPrevItem(
            userList.find((item) => {
                return item.id === selectedIdx - 1;
            })
        );
        setNextItem(
            userList.find((item) => {
                return item.id === selectedIdx + 1;
            })
        );
    }, [userList, selectedIdx]);

    return (
        <>
            <h3 className="title">Post Detail</h3>
            <h3>{selectedIdx}번 Detail</h3>
            {typeof selectedItem !== "undefined" && (
                <>
                    <h3>{selectedItem.title}</h3>
                    <UserContainer content={selectedItem.title + "입니다."} disabled={true} />
                    <>
                        {typeof prevItem !== "undefined" && (
                            <UserContainer
                                key={prevItem.id}
                                url={"/postdetail/" + userId + "/" + prevItem.id}
                                userID={userId}
                                itemID={prevItem.id}
                                content={prevItem.title}
                            />
                        )}
                        {typeof nextItem !== "undefined" && (
                            <UserContainer
                                key={nextItem.id}
                                url={"/postdetail/" + userId + "/" + nextItem.id}
                                userID={userId}
                                itemID={nextItem.id}
                                content={nextItem.title}
                            />
                        )}
                    </>
                </>
            )}
        </>
    );
};
export default PostDetail;
