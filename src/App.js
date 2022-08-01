import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./View/UserList";
import PostList from "./View/PostList";
import PostDetail from "./View/PostDetail";

export const origindata = atom({
    key: "origindata",
    default: [],
});

export const listDetail = atom({
    key: "listDetail",
    default: [],
});

function App() {
    const [data, setData] = useRecoilState(origindata);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
            setData(res.data);
        });
    }, []);

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
