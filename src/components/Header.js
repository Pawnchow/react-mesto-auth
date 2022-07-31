import { useState } from 'react';
import { Link, Route } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut}) {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
    function handleClickHamburger() {
        setIsHamburgerClicked(!isHamburgerClicked)
    }
    
    return (
        <header className={`header ${loggedIn && 'header_mobile-menu'}`}>
            <a className="header__logo" href='/'></a>
            <Route path="/sign-in">
                <Link to='sign-up' className="header__link">Регистрация</Link>
            </Route>
            <Route path="/sign-up">
                <Link to='sign-in' className="header__link">Войти</Link>
            </Route>    

            <Route exact path="/">
            <button className="hamburger" onClick={handleClickHamburger}>
                <span className={`${isHamburgerClicked ? 'hamburger__bar hamburger__bar_active' : 'hamburger__bar'}`}></span>
                <span className={`${isHamburgerClicked ? 'hamburger__bar hamburger__bar_active' : 'hamburger__bar'}`}></span>
                <span className={`${isHamburgerClicked ? 'hamburger__bar hamburger__bar_active' : 'hamburger__bar'}`}></span>
            </button>
            <div className={`${isHamburgerClicked ? 'header__menu' : 'header__menu header__menu_inactive'}`}>
                <p className="header__menu_email">{email}</p>
                <Link to='sign-in'
                    onClick={() => {
                    handleClickHamburger();
                    onSignOut();
                    }}
                    className="header__menu_link">Выйти</Link>
                </div>
            </Route>
        </header>
    )
}

export default Header;