import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import './navbar.css'
import logo from '../../assets/images/logo.svg'


const Menu = () => (
    <>
        <p><a href="#home">Home</a></p>
        <p><a href="#catalogue">Catalogue</a></p>
        <p><a href="#imdb">IMDB</a></p>
    </>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Prevent the mini-infobar from appearing on mobile.
            event.preventDefault();
            console.log("👍", "beforeinstallprompt", event);
            // Stash the event so it can be triggered later.
            window.deferredPrompt = event;
            // Remove the 'hidden' class from the install button container.
            setIsReadyForInstall(true);
        });
    }, []);

    async function downloadApp() {
        console.log("👍", "butInstall-clicked");
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            // The deferred prompt isn't available.
            console.log("oops, no prompt event guardado en window");
            return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        const result = await promptEvent.userChoice;
        console.log("👍", "userChoice", result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        setIsReadyForInstall(false);
    }

    return (
        <div className="navbar">
            <div className="navbar-links">
                <div className="navbar-links_logo">
                    <img src={logo} alt='logo of trailerama' />
                </div>
                <div className="navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="navbar-sign">
                {isReadyForInstall && <button type="button" onClick={downloadApp}>Download</button>}
            </div>
            <div className="navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <div className="navbar-menu_container scale-up-center">
                        <div className="navbar-menu_container-links">
                            <Menu />
                        </div>
                        <div className="navbar-menu_container-links-sign">
                            {isReadyForInstall && <button type="button" onClick={downloadApp}>Download</button>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;