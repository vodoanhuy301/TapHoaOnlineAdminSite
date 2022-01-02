import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/APICall";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
color: #34515e;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
`;
const FormItem = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  font-size: 18px;
`;
const FormInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
`;
const FormLabel = styled.span`
  padding: 10px;
`;
const FormButton = styled.div`
  padding: 15px;
  background-color: #8eacbb;
  color: white;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover{
    background-color: #607d8b;
  }
`;
const Error = styled.span`
  color: red;
`;
function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.admin);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  const user = useSelector((state) => state.admin.currentUser);
  return (
    <Container>
      {user ? <Title>Xin chào {user.username}</Title>
      : <Title>Đăng Nhập</Title>
    }
    {user?
      <Form>
      <FormItem>
        <FormLabel>Tên tài khoản:</FormLabel>
        <FormInput type="text" value={user.username} disabled/>
      </FormItem>
      <FormItem>
        <FormLabel>Email:</FormLabel>
        <FormInput type="text" value={user.email} disabled/>
      </FormItem>
    </Form>
    :
    <Form>
      <FormItem>
        <FormLabel>Tên tài khoản:</FormLabel>
        <FormInput type="text" onChange={(e) => setUsername(e.target.value)} />
      </FormItem>
      <FormItem>
        <FormLabel>Mật khẩu:</FormLabel>
        <FormInput type="password"  onChange={(e) => setPassword(e.target.value)} />
      </FormItem>
      <FormItem>
        <FormButton onClick={handleClick} disabled={isFetching} >Đăng nhập</FormButton>
      </FormItem>
        {error &&<FormItem> <Error>Lỗi! Vui lòng kiểm tra lại tên tài khoản và mật khẩu</Error></FormItem>}
    </Form>
  }
    </Container>
  );
}

export default LoginAdmin;
