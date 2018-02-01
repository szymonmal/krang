// @flow

import React from 'react';

import logo from '../../logo.svg';

type Props = {
  white: boolean
};

const Header = ({ white }: Props) => (
  <header className={`header ${white && 'header--white'}`}>
    <img src={logo} className="header__logo" alt="logo" />
    <h1 className="header__title">Welcome to React</h1>
  </header>
);

Header.displayName = 'Header';

export default Header;
