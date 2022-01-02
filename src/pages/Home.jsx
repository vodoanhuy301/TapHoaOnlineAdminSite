import Navbar from "../components/Navbar";
import styled from "styled-components";
import LoginAdmin from "../components/LoginAdmin";
const Container = styled.div`
  width: 100%;
`;
export default function Home() {
  return (
    <Container>
      <Navbar/>
      <LoginAdmin/>
    </Container>
  )
}
