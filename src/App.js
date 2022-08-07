import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./View/UserList";
import PostList from "./View/PostList";
import PostDetail from "./View/PostDetail";
import Loading from "./Component/Loading";

export const origindata = atom({
    key: "origindata",
    default: [],
});

export const listDetail = atom({
    key: "listDetail",
    default: [],
});

export const userData = atom({
    key: "userData",
    default: [],
});

function App() {
    const [data, setData] = useRecoilState(origindata);
    const [userdata, setUserdata] = useRecoilState(userData);
    const [loading, setLoading] = useState(null);

    const mainApi = async () => {
        try {
            setLoading(true);
            await axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                setUserdata(res.data);
            });
            await axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
                setData(res.data);
            });
        } catch (e) {
            console.debug("error");
        }
        setLoading(false);
    };

    useEffect(() => {
        mainApi();
    }, []);

    if (loading) return <Loading />;

    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <button>
                        <Link to="/">HOME</Link>
                    </button>
                </header>
                <Routes>
                    <Route path="/" exact element={<UserList />} />
                    <Route path="/postlist/:userId" element={<PostList />} />
                    <Route path="/postdetail/:userId/:itemId" element={<PostDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
