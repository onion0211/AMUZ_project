import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./View/UserList";
import PostList from "./View/PostList";
import PostDetail from "./View/PostDetail";

function App() {
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
