import { useNavigate, Link } from "react-router-dom";

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

    return (
        <>
            <button className="userBox" onClick={goTo} disabled={props.disabled}>
                {props.content}
            </button>
        </>
    );
};
export default UserContainer;
