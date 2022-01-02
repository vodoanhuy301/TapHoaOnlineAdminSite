import styled from "styled-components";
import Navbar from "../components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "../requestsAPI";

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
  padding: 10px;
  background-color: green;
  margin: 20px;
  color: white;
  cursor: pointer;
  text-align: center;
`;

const Title = styled.h1`
  margin-left: 20px;
`;
const ContainerButton = styled.div`
  display: flex;
`;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: white;
  //transform: translateX(-50%) translateY(-50%);
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
const FormTitle = styled.span`
  padding: 10px;
  font-size: 26px;
  font-weight: 500;
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
  transition: all 0.1s ease;
  &:hover {
    background-color: #607d8b;
  }
`;
const FormMiniButton = styled.div`
  padding: 10px;
  background-color: orange;
  color: white;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
const BannerManagement = () => {
  const [finalData, setFinalData] = useState([]);
  const [overlay, setOverlay] = useState("none");
  const [overlayEdit, setOverlayEdit] = useState("none");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [banner, setBanner] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get(
          "http://localhost:3001/api/banners/"
        );
        let tmpArr = [];
        res.data.map((banner) => {
          // const {updatedAt, __v,...others} = product;
          tmpArr.push(banner);
        });
        setFinalData(tmpArr);
      } catch (err) {}
    };
    getData();
  }, []);
  finalData.map((banner) => {
    banner["id"] = banner["_id"];
    delete banner["_id"];
  });
  const checkValuesObj =(obj)=>{
    for (var key in obj) {
      if (obj[key] == null || obj[key] == "" || obj[key] ==[""])
      delete obj[key];
  }
  }
  const reloadData = async () => {
    const getData = async () => {
      try {
        const res = await userRequest.get(
          "http://localhost:3001/api/banners/"
        );
        let tmpArr = [];
        res.data.map((banner) => {
          // const {updatedAt, __v,...others} = product;
          tmpArr.push(banner);
        });
        setFinalData(tmpArr);
      } catch (err) {}
    };
    getData();
    finalData.map((order) => {
      order["id"] = order["_id"];
      delete order["_id"];
    });
  };
  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(
        `http://localhost:3001/api/banners/` + id
      );
      alert("Đã xóa: " + id);
    } catch (err) {}
    await reloadData();
  };
  const saveBanner = async () => {
    var obj = { title, desc, img, link, bgColor};
    await checkValuesObj(obj);
    try {
      const res = await userRequest.put(
        `http://localhost:3001/api/banners/${id}`
      ,obj);
    } catch (err) {}
    await reloadData();
    setOverlayEdit("none");
  };
  const handleEdit = async (rowId) => {
    try {
      const res = await userRequest.get(
        `http://localhost:3001/api/banners/find/${rowId}`
      );
      setBanner(res.data);
      setId(rowId);
    } catch (err) {}
    setOverlayEdit("flex");
  };
  const addBanner = async () => {
    try {
      const res = await userRequest.post(
        "http://localhost:3001/api/banners/",
        { title, desc, img, link, bgColor}
      );
    } catch (err) {}
    await reloadData();
    setOverlay("none");
  };
  const handleCancelEdit = () => {
     reloadData();
    setOverlay("none");
    setOverlayEdit("none");
  };
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "title",
      headerName: "Khuyến mãi",
      width: 500,
      renderCell: (params) => {
        return (
          <Item>
            <Img src={params.row.img} alt="" />
            {params.row.title}
          </Item>
        );
      },
    },
    {
      field: "link",
      headerName: "Sản phẩm áp dụng",
      width: 400,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ButtonEdit
              onClick={(e) => {
                handleEdit(params.row.id);
              }}
            >
              {/* <ButtonEdit onClick={(e) => console.log(params.row.id)}> */}
              Sửa
            </ButtonEdit>
            <ButtonDelete onClick={(e) => handleDelete(params.row.id)}>
              Xóa
            </ButtonDelete>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      {/* Create */}
      <Overlay display={overlay}>
        <Form>
          <FormItem>
            <FormTitle>Tạo khuyến mãi mới</FormTitle>
          </FormItem>
          <FormItem>
            <FormLabel>Tên khuyến mãi:</FormLabel>
            <FormInput type="text" onChange={(e) => setTitle(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Mô tả khuyến mãi:</FormLabel>
            <FormInput type="text" onChange={(e) => setDesc(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Link hình ảnh:</FormLabel>
            <FormInput type="text" onChange={(e) => setImg(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Link sản phẩm:</FormLabel>
            <FormInput type="text" placeholder="Nếu có sản phẩm cố định" onChange={(e) => setLink(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Màu banner:</FormLabel>
            <FormInput type="text" onChange={(e) => setBgColor(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormButton
              onClick={handleCancelEdit}
            >
              Hủy
            </FormButton>
            <FormButton onClick={addBanner}>Thêm</FormButton>
          </FormItem>
        </Form>
      </Overlay>
      {/* Update */}
      <Overlay display={overlayEdit}>
        <Form>
          <FormItem>
            <FormTitle>Sửa khuyến mãi</FormTitle>
          </FormItem>
          <FormItem>
            <FormLabel>Tên khuyến mãi:</FormLabel>
            <FormInput type="text" defaultValue={banner.title} onChange={(e) => setTitle(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Mô tả khuyến mãi:</FormLabel>
            <FormInput type="text" defaultValue={banner.desc}  onChange={(e) => setDesc(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Link hình ảnh sản phẩm:</FormLabel>
            <FormInput type="text" defaultValue={banner.img}  onChange={(e) => setImg(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Link sản phẩm:</FormLabel>
            <FormInput type="text" defaultValue={banner.link}  onChange={(e) => setLink(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Màu banner:</FormLabel>
            <FormInput type="text" defaultValue={banner.bgColor}  onChange={(e) => setBgColor(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormButton
              onClick={handleCancelEdit}
            >
              Hủy
            </FormButton>
            <FormButton onClick={saveBanner}>Thêm</FormButton>
          </FormItem>
        </Form>
      </Overlay>
      <Navbar />
      <Title>Quản lí khuyến mãi</Title>
      <ContainerButton>
        <ButtonCreate
          onClick={() => {
            setOverlay("flex");
          }}
        >
          Tạo khuyến mãi mới
        </ButtonCreate>
        <ButtonCreate onClick={reloadData}>Tải lại</ButtonCreate>
      </ContainerButton>

      <DataGrid
        rows={finalData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </Container>
  );
};
export default BannerManagement;
