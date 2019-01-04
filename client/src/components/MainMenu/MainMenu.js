import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAIN_MENU } from '../mainMenu';

import ButtonMenu from '../ButtonMenu/ButtonMenu';
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

const mapStateToProps = (state) => ({
  globalAuth: state.auth
});

export default connect(mapStateToProps, {})(MainMenu);
