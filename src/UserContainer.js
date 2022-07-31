import { Link } from "react-router-dom";

const UserContainer = (props) => {
    // const noGo = () => {
    //     if (props.mode === "no") {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // };

    const goTo = () => {
        window.location.href = props.url;
    };

    // const card = () => {
    //     return (
    //         <button className="userBox" onClick={goTo}>
    //             {props.content}
    //         </button>
    //     );
    // };
    return (
        // <a style="display:flex;" href={url(props.mode, props.userId)}>
        //     {/* <span class="prefix" if="props.prefix != null"> prefix </span> */}
        //     <span> {props.content} </span>
        //     {/* <span class="prefix" if="props.prefix != null"> prefix </span> */}
        // </a>
        // <div className="userBox" onClick={goTo}>
        //     {props.content}
        // </div>
        <>
            {props.prev !== null && (
                <button className="userBox" onClick={goTo}>
                    {props.content}
                </button>
            )}
            <button className="userBox" onClick={goTo}>
                {props.content}
            </button>
            {props.next !== null && (
                <button className="userBox" onClick={goTo}>
                    {props.content}
                </button>
            )}
        </>
        // <>
        //     {noGo() ? (
        //         // <Link to={"/" + props.mode + "/" + props.userId}>
        //         <div className={"userBox"} onClick={goTo}>
        //             {props.content}
        //         </div>
        //         // </Link>
        //     ): (
        //         <div className={"userBox"}>{props.content}</div>
        //     )}
        // </>
    );
};
export default UserContainer;
