import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Routing from '../../components/Routing';
import './Layout.css';

interface Props {
    dark: {isDarkMode: boolean, setIsDarkMode: Function}
}
const Layout:React.FC<Props> = ({dark}):JSX.Element => {
    return (
        <div className="Layout">
            <header>
                <NavBar dark={dark}/>
            </header>
            <main>
                <Routing/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;
