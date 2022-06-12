import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer, MenuItem } from "../styles/styledUtils";
import Brand from "./Brand";

const MenuList = ({onClick}) => {
    const menuListItems = [
        {
            id: 1, 
            name: "Home",
            path: "/"
        },
        {
            id: 2, 
            name: "Trade",
            path: "/trade"
        },
        {
            id: 3, 
            name: "Deposit",
            path: "/deposit"
        },
        {
            id: 4, 
            name: "Withdraw",
            path: "/withdraw"
        },
        
    ]
  return (
    <MenuContainer>
      
        <Brand style={{display: 'flex', justifyContent: "center", marginTop: 20, marginBottom: 20,}} />
     
      <Icon style={{marginBottom: 20,}} onClick={onClick} icon="akar-icons:cross" />
      <div>
          {menuListItems.map(({id,name,path})=>{
              return (
                  <MenuItem onClick={onClick} key={id} to={path}>
                    
                        <p style={{fontWeight: "bold", fontSize: 17, flex: 1}}>{name}</p>
                        
                        <Icon
                        style={{ marginTop: -15}} icon="akar-icons:arrow-right" />
                  </MenuItem>
              )
          })}
      </div>
    </MenuContainer>
  );
};

export default MenuList;
