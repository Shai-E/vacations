import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Routing from '../../components/Routing';
import './Layout.css';


function Layout({dark}:{dark: {isDarkMode: boolean, setIsDarkMode: Function}}) {
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
