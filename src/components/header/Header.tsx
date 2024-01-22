import React from 'react';

import Logo from '../../assets/icons/logo.svg?react';
import HeaderLinks from './HeaderLinks';

import styles from './Header.module.scss';
import SearchBar from '../task1/SearchBar';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.nav}>
        <SearchBar />
        <HeaderLinks />
      </div>
    </header>
  );
};

export default Header;
