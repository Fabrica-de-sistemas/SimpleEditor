import { Outlet, Link } from "react-router-dom";
//import './Layout.css'

export default function Layout() {
    return (
        <>
            <nav className="navbar">
                <ul className="nav-links">
                    <li className="nav-link"><Link to="/">Home</Link></li>
                    <li className="nav-link"><Link to="/editor">Editor</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}