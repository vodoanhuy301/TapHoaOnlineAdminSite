
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest, publicRequest} from "../requestsAPI";
import {useLocation } from "react-router";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
font-size: 20px;
padding-bottom: 10px;
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 500;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
font-size: 20px`;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
  font-size: 18px;
  margin: 10px;
  display: block;
`;
const RemoveProduct = styled.span`
  color: orange;
  margin-left: 50px;
  text-decoration: underline;
  cursor: pointer;
`;
const OrderDetail = () => {
  const Location = useLocation();
  const id = Location.pathname.split('/')[2];
  const shippingFee = 1;
  const [order,setOrder]= useState({});
  // const totalPay = shippingFee + cart.total;
  useEffect(()=>{
    const getOrder= async () => {
      try {
        const res = await publicRequest.get("/orders/find/" +id);
        setOrder(res.data);
        console.log(res.data);
      } catch (err) {}
    };
    getOrder();
  },[id]);
  // const getOrder= async () => {
  //   try {
  //     const res = await publicRequest.get("/orders/find/" +id);
  //     setOrder(res.data);
  //   } catch (err) {}
  // };
  // getOrder();

  const currencyFormat=(num) =>{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " đ";
  }
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Chi tiết đơn hàng: {order._id}</Title>
        <Top>
          <Link to="/order">
            <TopButton>Trở lại</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {order.products?.map((item) => (
              <Product>
                <ProductDetail>
                  <Details>
                    <ProductName>
                      <b>Sản phẩm: </b>{item.productName}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b> {item.productId}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>Số lượng: {item.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    {currencyFormat(item.price * item.quantity)}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
          <SummaryItem>
              <SummaryItemText>Họ và tên người nhận hàng</SummaryItemText>
              <SummaryItemPrice>{order.name}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Địa chỉ</SummaryItemText>
              <SummaryItemPrice>{order.address}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Số điện thoại</SummaryItemText>
              <SummaryItemPrice>{order.phone}</SummaryItemPrice>
            </SummaryItem>
            <SummaryTitle>Tổng cộng</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Tổng tiền hàng</SummaryItemText>
              <SummaryItemPrice>{order.amount &&  currencyFormat(order.amount-1)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí ship</SummaryItemText>
              <SummaryItemPrice>{currencyFormat(shippingFee)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng cộng</SummaryItemText>
              <SummaryItemPrice>{order.amount && currencyFormat(order.amount)}</SummaryItemPrice>
            </SummaryItem>
            
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default OrderDetail;
