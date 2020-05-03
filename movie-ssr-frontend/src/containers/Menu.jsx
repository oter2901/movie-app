import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const MenuContainer = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        Movies App
      </Menu.Item>
      <Menu.Item as="a">
        <NavLink to="/persons">Persons</NavLink>
      </Menu.Item>
      <Menu.Item as="a">
        <NavLink to="/movies">Movies</NavLink>
      </Menu.Item>
      {!localStorage.getItem("TOKEN") ? (
        <>
          <Menu.Item as="a">
            <NavLink to="/signin">Login</NavLink>
          </Menu.Item>
          <Menu.Item as="a">
            <NavLink to="/signup">Sign up</NavLink>
          </Menu.Item>
        </>
      ) : (
        "Logout"
      )}
    </Container>
  </Menu>
);

export default MenuContainer;
