import React, { useLayoutEffect, useState, useEffect, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState, atom } from "recoil";
import { listDetail, origindata, commentData } from "../Component/Atom";
import UserContainer from "../Component/UserContainer";
import {
    EmojiHappyIcon,
    EmojiSadIcon,
    FireIcon,
    HeartIcon,
    PaperClipIcon,
    ThumbUpIcon,
    XIcon,
} from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import Loading from "../Component/Loading";
import JHM from "../Image/JHM.jpeg";

const moods = [
    {
        name: "Excited",
        value: "excited",
        icon: FireIcon,
        iconColor: "text-white",
        bgColor: "bg-red-500",
    },
    {
        name: "Loved",
        value: "loved",
        icon: HeartIcon,
        iconColor: "text-white",
        bgColor: "bg-pink-400",
    },
    {
        name: "Happy",
        value: "happy",
        icon: EmojiHappyIcon,
        iconColor: "text-white",
        bgColor: "bg-green-400",
    },
    {
        name: "Sad",
        value: "sad",
        icon: EmojiSadIcon,
        iconColor: "text-white",
        bgColor: "bg-yellow-400",
    },
    {
        name: "Thumbsy",
        value: "thumbsy",
        icon: ThumbUpIcon,
        iconColor: "text-white",
        bgColor: "bg-blue-500",
    },
    {
        name: "I feel nothing",
        value: null,
        icon: XIcon,
        iconColor: "text-gray-400",
        bgColor: "bg-transparent",
    },
];

const people = [
    {
        name: "Leonard Krasner",
        handle: "leonardkrasner",
        imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Floyd Miles",
        handle: "floydmiles",
        imageUrl:
            "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Emily Selman",
        handle: "emilyselman",
        imageUrl:
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Kristin Watson",
        handle: "kristinwatson",
        imageUrl:
            "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

//git push test
const PostDetail = () => {
    const { userId, itemId } = useParams();
    const data = useRecoilValue(origindata);
    const [selectedIdx, setSelectedIdx] = useState(Number(itemId));
    const [selectedItem, setSelectedItem] = useState({});
    const [prevItem, setPrevItem] = useState({});
    const [nextItem, setNextItem] = useState({});

    // console.log("origindata", data);
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

    const [selectedIcon, setSelectedIcon] = useState(moods[5]);
    //댓글 기능
    const [comment, setComment] = useRecoilState(commentData);
    const [loading, setLoading] = useState(null);
    const [postComment, setPostComment] = useState([]);
    const commentApi = async () => {
        if (comment.length === 0) {
            try {
                setLoading(true);
                await axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
                    setComment(res.data);
                    console.log("##comment", comment);
                });
            } catch (e) {
                console.debug("error");
            }
            setLoading(false);
        }
    };
    useLayoutEffect(() => {
        commentApi();
    }, []);

    const postCommentList = comment.filter((item) => {
        return item.postId === Number(itemId);
    });

    return (
        <>
            {loading ? <Loading /> : <></>}
            <h3 className="title">Post Detail</h3>
            <h3>{selectedIdx}번 Detail</h3>
            {typeof selectedItem !== "undefined" && (
                <>
                    <UserContainer type="postDetail" item={selectedItem} />
                    <>
                        {typeof prevItem !== "undefined" && (
                            <UserContainer
                                type="button"
                                key={prevItem.id}
                                url={"/postdetail/" + userId + "/" + prevItem.id}
                                content={prevItem.title}
                            />
                        )}
                        {typeof nextItem !== "undefined" && (
                            <UserContainer
                                type="button"
                                key={nextItem.id}
                                url={"/postdetail/" + userId + "/" + nextItem.id}
                                content={nextItem.title}
                            />
                        )}
                    </>

                    <div className="flex items-start space-x-4" style={{ margin: "0px 10px" }}>
                        <div className="flex-shrink-0">
                            <img className="inline-block h-10 w-10 rounded-full" src={JHM} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <form action="#" className="relative">
                                <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                    <label htmlFor="comment" className="sr-only">
                                        Add your comment
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="comment"
                                        id="comment"
                                        className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                                        placeholder="Add your comment..."
                                        defaultValue={""}
                                    />

                                    {/* Spacer element to match the height of the toolbar */}
                                    <div className="py-2" aria-hidden="true">
                                        {/* Matches height of button in toolbar (1px border + 36px content height) */}
                                        <div className="py-px">
                                            <div className="h-9" />
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
                                    <div className="flex items-center space-x-5">
                                        <div className="flex items-center">
                                            <Listbox
                                                value={selectedIcon}
                                                onChange={setSelectedIcon}
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <Listbox.Label className="sr-only">
                                                            Your mood
                                                        </Listbox.Label>
                                                        <div className="relative">
                                                            <Listbox.Button className="relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500">
                                                                <span className="flex items-center justify-center">
                                                                    {selectedIcon.value === null ? (
                                                                        <span>
                                                                            <EmojiHappyIcon
                                                                                className="flex-shrink-0 h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                            <span className="sr-only">
                                                                                Add your mood
                                                                            </span>
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            <span
                                                                                className={classNames(
                                                                                    selectedIcon.bgColor,
                                                                                    "w-8 h-8 rounded-full flex items-center justify-center"
                                                                                )}
                                                                            >
                                                                                <selectedIcon.icon
                                                                                    className="flex-shrink-0 h-5 w-5 text-white"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                            <span className="sr-only">
                                                                                {selectedIcon.name}
                                                                            </span>
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                                                    {moods.map((mood) => (
                                                                        <Listbox.Option
                                                                            key={mood.value}
                                                                            className={({
                                                                                active,
                                                                            }) =>
                                                                                classNames(
                                                                                    active
                                                                                        ? "bg-gray-100"
                                                                                        : "bg-white",
                                                                                    "cursor-default select-none relative py-2 px-3"
                                                                                )
                                                                            }
                                                                            value={mood}
                                                                        >
                                                                            <div className="flex items-center">
                                                                                <div
                                                                                    className={classNames(
                                                                                        mood.bgColor,
                                                                                        "w-8 h-8 rounded-full flex items-center justify-center"
                                                                                    )}
                                                                                >
                                                                                    <mood.icon
                                                                                        className={classNames(
                                                                                            mood.iconColor,
                                                                                            "flex-shrink-0 h-5 w-5"
                                                                                        )}
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </div>
                                                                                <span className="ml-3 block font-medium truncate">
                                                                                    {mood.name}
                                                                                </span>
                                                                            </div>
                                                                        </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                    </>
                                                )}
                                            </Listbox>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {postCommentList.length !== 0 ? (
                        <div style={{ margin: "0px 10px" }}>
                            <div className="flow-root mt-6">
                                <ul role="list" className="-my-5 divide-y divide-gray-200">
                                    {postCommentList.map((person) => (
                                        <li key={person.id} className="py-4">
                                            <div className="flex justify-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={JHM}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate text-left">
                                                        {person.name + " / " + person.email}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate text-left">
                                                        {person.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div>댓글 없지롱~~~!!!!!</div>
                    )}
                </>
            )}
        </>
    );
};
export default PostDetail;
