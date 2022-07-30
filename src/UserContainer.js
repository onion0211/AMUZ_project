import { Link } from "react-router-dom";

const UserContainer = (props) => {
    const noGo = () => {
        if (props.mode === "no") {
            return false;
        } else {
            return true;
        }
    };
    return (
        <>
            {noGo() ? (
                <Link to={"/" + props.mode + "/" + props.userId}>
                    <div className={"userBox"}>{props.content}</div>
                </Link>
            ) : (
                <div className={"userBox"}>{props.content}</div>
            )}
        </>
    );
};
export default UserContainer;
