import styled from "styled-components";
import Navbar from "../components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "../requestsAPI";
import { useNavigate } from "react-router";

const ContainerList = styled.div`
  flex: 4;
`;
const Container = styled.div``;
const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ButtonEdit = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 10px;
`;
const ButtonDelete = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  background-color: orange;
  margin-right: 20px;
  color: white;
  cursor: pointer;
  text-align: center;
`;
const ButtonCreate = styled.div`
  width: 200px;
  border: none;
  border-radius: 10px;
  padding:10px;
  background-color: green;
  margin: 20px;
  color: white;
  cursor: pointer;
  text-align: center;
`;

const Title =styled.h1`
margin-left: 20px;
`;
const ContainerButton =styled.div`
display: flex;
`;
const OrderManagement = () => {
  const nevigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get("http://localhost:3001/api/orders/");
        let tmpArr = [];
        res.data.map((order) => {
          tmpArr.push(order);
        });
        setData(tmpArr);
      } catch (err) {}
    };
    getData();
  }, []);
  data.map((order) => {
    order["id"] = order["_id"];
    delete order["_id"];
  });
  const reloadData= async() => {
    const getData = async () => {
      try {
        const res = await userRequest.get("http://localhost:3001/api/orders/");
        let tmpArr = [];
        res.data.map((order) => {
          tmpArr.push(order);
        });
        setData(tmpArr);
      } catch (err) {}
    };
    getData();
    data.map((order) => {
      order["id"] = order["_id"];
      delete order["_id"];
    });
  }
  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(
        `http://localhost:3001/api/orders/` + id
      );
    } catch (err) {}
    await reloadData();
  };
  const handleApprove = async (id) => {
    try {
      const res = await userRequest.put(
        `http://localhost:3001/api/orders/${id}`,
        {status: "đã duyệt đơn"}
      );
    } catch (err) {
      console.log("Lỗi");
    }
    await handleDecreaseStock(id);
    await reloadData();
  }
  const handleDecreaseStock = async (id) => {

    try {
      const res = await userRequest.get(
        `http://localhost:3001/api/orders/find/${id}`);
        let tmpArr = [];
        console.log(res.data.products);
        tmpArr=res.data.products;
        tmpArr.map(async(product) =>{
        try{
          let quantity = product.quantity;
          let res = await userRequest.put(`http://localhost:3001/api/products/stock/${product.productId}`,{quantity});
        }catch(err){}
        });
    } catch (err) {
    }
    await reloadData();
  }
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Họ tên người nhận",
      width: 200,
    
    },
    { field: "address", headerName: "Địa chỉ", width: 200 },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Tổng tiền",
      width: 90,
    },{
      field: "status",
      headerName: "Trạng thái",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
              {params.row.status=="đang xử lí" && <ButtonEdit onClick={(e) => handleApprove(params.row.id)}>Duyệt đơn</ButtonEdit>}
              <ButtonEdit onClick={(e) => nevigate("/donhang/"+params.row.id)}>Chi tiết</ButtonEdit>
              <ButtonDelete onClick={(e) => handleDelete(params.row.id)}>Xóa</ButtonDelete>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Navbar />
      <Title>Quản lí đơn hàng</Title>
      <ContainerButton>
      <ButtonCreate onClick={reloadData}>Tải lại</ButtonCreate>
      </ContainerButton>
      
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
    </Container>
  );
};
export default OrderManagement;
