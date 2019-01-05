import { MAIN_MENU } from '../mainMenu';
import React, { Component } from 'react';

import ButtonMenu from '../ButtonMenu/ButtonMenu';
import withReducedStateAuth from '../withReducedStateAuth/withReducedStateAuth';

import './mainMenu.css';


class MainMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {

    const menus = MAIN_MENU;
    const { authData = {}, isLoggedIn } = this.props.globalAuth;

    console.log(isLoggedIn);

    return(
      <div className="mainMenu">
        {
          isLoggedIn && (
            menus.map((menu, idx)=>{
            let menuId = `m-${idx}`;
            return(
              <ButtonMenu key={menuId} label={menu.label} options={menu.options} className="mainMenu__item" />
            )})
          )
        }
      </div>
    )
  }
}

export default withReducedStateAuth(MainMenu);
