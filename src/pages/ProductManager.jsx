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
  background-color: rgba(0, 0, 0, 0.7);
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
const ProductManager = () => {
  const [finalData, setFinalData] = useState([]);
  const [overlay, setOverlay] = useState("none");
  const [overlayEdit, setOverlayEdit] = useState("none");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [product, setProduct] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get(
          "http://localhost:3001/api/products/"
        );
        let tmpArr = [];
        res.data.map((product) => {
          // const {updatedAt, __v,...others} = product;
          tmpArr.push(product);
        });
        setFinalData(tmpArr);
      } catch (err) {}
    };
    getData();
  }, []);
  finalData.map((order) => {
    order["id"] = order["_id"];
    delete order["_id"];
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
          "http://localhost:3001/api/products/"
        );
        let tmpArr = [];
        res.data.map((product) => {
          // const {updatedAt, __v,...others} = product;
          tmpArr.push(product);
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
        `http://localhost:3001/api/products/` + id
      );
      alert("Đã xóa: " + id);
    } catch (err) {}
    await reloadData();
  };
  const saveProduct = async () => {
    var obj = { title, desc, img, categories, size, color, price, stock };
    await checkValuesObj(obj);
    try {
      const res = await userRequest.put(
        `http://localhost:3001/api/products/${id}`
      ,obj);
    } catch (err) {}
    await reloadData();
    setOverlayEdit("none");
  };
  const handleEdit = async (rowId) => {
    try {
      const res = await userRequest.get(
        `http://localhost:3001/api/products/find/${rowId}`
      );
      setProduct(res.data);
      setId(rowId);
    } catch (err) {}
    setOverlayEdit("flex");
  };
  const addProduct = async () => {
    try {
      const res = await userRequest.post(
        "http://localhost:3001/api/products/",
        { title, desc, img, categories, size, color, price, stock }
      );
    } catch (err) {}
    await reloadData();
    setOverlay("none");
  };
  const handleCancelEdit = () => {
    reloadData();
    setOverlayEdit("none");
  };
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "product",
      headerName: "Product",
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
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
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
            <FormTitle>Tạo sản phẩm mới</FormTitle>
          </FormItem>
          <FormItem>
            <FormLabel>Tên sản phẩm:</FormLabel>
            <FormInput type="text" onChange={(e) => setTitle(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Mô tả sản phẩm:</FormLabel>
            <FormInput type="text" onChange={(e) => setDesc(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Link hình ảnh sản phẩm:</FormLabel>
            <FormInput type="text" onChange={(e) => setImg(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Loại:</FormLabel>
            <FormInput
              type="text"
              placeholder="ví dụ: banh-keo"
              onBlur={(e) => {
                setCategories(e.target.value.split(" "));
              }}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Kích cỡ:</FormLabel>
            <FormInput type="text" onChange={(e) => setSize(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Màu:</FormLabel>
            <FormInput type="text" onChange={(e) => setColor(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Giá:</FormLabel>
            <FormInput type="text" onChange={(e) => setPrice(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>Số sản phẩm:</FormLabel>
            <FormInput type="text" onChange={(e) => setStock(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormButton
              onClick={() => {
                setOverlay("none");
              }}
            >
              Hủy
            </FormButton>
            <FormButton onClick={addProduct}>Thêm</FormButton>
          </FormItem>
        </Form>
      </Overlay>
      {/* Update */}
      <Overlay display={overlayEdit}>
        <Form>
          <FormItem>
            <FormTitle>Sửa sản phẩm</FormTitle>
          </FormItem>
          <FormItem>
            <FormLabel>Tên sản phẩm:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.title}
              onBlur={(e) => setTitle(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Mô tả sản phẩm:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.desc}
              onBlur={(e) => setDesc(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Link hình ảnh sản phẩm:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.img}
              onBlur={(e) => setImg(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Loại:</FormLabel>
            <FormInput
              type="text"
              defaultValue={
                product.categories ? product.categories.join(" ") : ""
              }
              placeholder="ví dụ: banh-keo"
              onBlur={(e) => {
                setCategories(e.target.value.split(" "));
              }}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Kích cỡ:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.size}
              onBlur={(e) => setSize(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Màu:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.color}
              onBlur={(e) => setColor(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Giá:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.price}
              onBlur={(e) => setPrice(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Số sản phẩm:</FormLabel>
            <FormInput
              type="text"
              defaultValue={product.stock}
              onBlur={(e) => setStock(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormButton onClick={handleCancelEdit}>Hủy</FormButton>
            <FormButton onClick={saveProduct}>Lưu</FormButton>
          </FormItem>
        </Form>
      </Overlay>
      <Navbar />
      <Title>Quản lí sản phẩm</Title>
      <ContainerButton>
        <ButtonCreate
          onClick={() => {
            setOverlay("flex");
          }}
        >
          Tạo sản phẩm mới
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
export default ProductManager;
