import { MAIN_MENU } from '../mainMenu';
import React, { Component } from 'react';

import ButtonMenu from '../ButtonMenu/ButtonMenu';
import withReducedStateAuth from '../withReducedStateAuth/withReducedStateAuth';
import './mainMenu.css';

class MainMenu extends Component {

  render() {

    const menus = MAIN_MENU;
    const { authData: {name = ""}, isLoggedIn } = this.props.globalAuth;
    const menusToRender = menus.map((menu, idx)=>{
    let menuId = `m-${idx}`;
    return(
      <ButtonMenu key={menuId} label={menu.label} options={menu.options} className="mainMenu__item" />
    )})


    return(
      <div className="mainMenu">
        {
          isLoggedIn && (
            <div className="mainMenu">
              <div>{name}</div>
              <div>{menusToRender}</div>
            </div>
          )
        }
      </div>
    )
  }
}

export default withReducedStateAuth(MainMenu);
