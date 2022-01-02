import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../redux/adminRedux";
const Container = styled.div`
  height: 8vh;
  background-color: #34515e;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  padding: 10px;
  color: white;
`;
const LeftTitle = styled.div`
  margin-left: 50px;
  font-size: 28px;
  cursor: pointer;
`;
const Right = styled.div`
  padding: 10px;
  color: white;
  display: flex;
  justify-content: center;
`;
const NavbarItem = styled.div`
  padding: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    color: silver;
    font-size: 18px;
  }
`;
const MiniLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
function Navbar() {
  const user = useSelector((state) => state.admin.currentUser);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  return (
    <Container>
      <Left>
        <MiniLink to="/">
          <LeftTitle>Trang quản lí bán hàng</LeftTitle>
        </MiniLink>
      </Left>
      {user&&<Right>
        <MiniLink to="/product">
          <NavbarItem>Quản lí sản phẩm</NavbarItem>
        </MiniLink>
        <MiniLink to="/user">
        <NavbarItem>Quản lí người dùng</NavbarItem>
        </MiniLink>
        <MiniLink to="/order">
        <NavbarItem>Quản lí đơn hàng</NavbarItem>
        </MiniLink>
        <MiniLink to="/banner">
        <NavbarItem>Quản lí khuyến mãi</NavbarItem>
        </MiniLink>
        {user&&<NavbarItem onClick={(e)=>{dispatch(logout()); nevigate("/")}}>Đăng xuất, {user.username}</NavbarItem>}
      </Right>}
      
    </Container>
  );
}

export default Navbar;
