import { useNavigate, Link } from "react-router-dom";
import JnE from "../Image/JnE.jpeg";
import { UserIcon } from "@heroicons/react/solid";

const UserContainer = (props) => {
    const history = useNavigate();
    const goTo = () => {
        history(props.url, {
            state: {
                userID: props.userID,
                itemID: props.itemID,
            },
        });
    };

    const userListComponent = (list) => {
        const userList = JSON.parse(list);
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {userList.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={JnE} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <a href={"/postlist/" + item.id} className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {item.company.name + " / " + item.company.catchPhrase}
                                    </p>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const postListComponent = (list) => {
        function classNames(...classes) {
            return classes.filter(Boolean).join(" ");
        }

        const postList = JSON.parse(list);

        return (
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {postList.map((item, idx) => (
                        <li key={item.id}>
                            <div className="relative pb-8">
                                {idx !== postList.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span
                                            className={classNames(
                                                "bg-green-500",
                                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                            )}
                                        >
                                            <UserIcon
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <a
                                                href={"/postdetail/" + props.userId + "/" + item.id}
                                                className="font-medium text-gray-900"
                                            >
                                                {item.title}
                                            </a>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                            <div>{item.completed ? "완성" : "미완성"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const postDetailComponent = (item) => {
        return (
            <div className="pb-5 border-b border-gray-200" style={{ marginBottom: "20px" }}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">{item.title + "입니다."}</p>
            </div>
        );
    };

    return (
        // <>
        //     <button className="userBox" onClick={goTo} disabled={props.disabled}>
        //         {props.content}
        //     </button>
        // </>
        <>
            {props.type === "userList" && userListComponent(props.list)}
            {props.type === "postList" && postListComponent(props.list)}
            {props.type === "button" && (
                <Link to={{ pathname: props.url }}>
                    <div className="userBox">{props.content}</div>
                </Link>
            )}
            {props.type === "postDetail" && postDetailComponent(props.item)}
        </>
        // <Link to={{ pathname: props.url }}>
        //     <div className="userBox">{props.content}</div>
        // </Link>
    );
};
export default UserContainer;
