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
const UserManagement = () => {
  const [overlay, setOverlay] = useState("none");
  const [overlayEdit, setOverlayEdit] = useState("none");
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState();
  const [user, setUser] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get("http://localhost:3001/api/users/");
        let tmpArr = [];
        res.data.map((product) => {
          tmpArr.push(product);
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
  const reloadData = async () => {
    const getData = async () => {
      try {
        const res = await userRequest.get("http://localhost:3001/api/users/");
        let tmpArr = [];
        res.data.map((user) => {
          tmpArr.push(user);
        });
        setData(tmpArr);
      } catch (err) {}
    };
    getData();
    data.map((order) => {
      order["id"] = order["_id"];
      delete order["_id"];
    });
  };
  const addUser = async () => {
    try {
      const res = await userRequest.post(
        "http://localhost:3001/api/auth/dangki",
        { username, email, password }
      );
    } catch (err) {}
    await reloadData();
    setOverlay("none");
  };
  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(
        `http://localhost:3001/api/users/` + id
      );
    } catch (err) {}
    await reloadData();
  };
  const checkValuesObj = (obj) => {
    for (var key in obj) {
      if (obj[key] == null || obj[key] == "" || obj[key] == [""])
        delete obj[key];
    }
  };
  const saveUser = async () => {
    var obj = { username, email, password, isAdmin };
    await checkValuesObj(obj);
    try {
      const res = await userRequest.put(
        `http://localhost:3001/api/users/${id}`,
        obj
      );
    } catch (err) {
      console.log("L???i");
    }
    await reloadData();
    setOverlayEdit("none");
  };
  const handleEdit = async (id) => {
    try {
      const res = await userRequest.get(
        `http://localhost:3001/api/users/find/${id}`
      );
      setId(id);
      setUser(res.data);
    } catch (err) {}
    setOverlayEdit("flex");
  };
  const handleCancelEdit = () => {
    reloadData();
    setOverlayEdit("none");
  };
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "username",
      headerName: "T??n t??i kho???n",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "password",
      headerName: "M???t kh???u ???? m?? h??a",
      width: 300,
    },
    {
      field: "isAdmin",
      headerName: "Admin?",
      width: 300,
    },
    {
      field: "createdAt",
      headerName: "Ng??y t???o",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ButtonEdit onClick={(e) => handleEdit(params.row.id)}>
              S???a
            </ButtonEdit>
            <ButtonDelete onClick={(e) => handleDelete(params.row.id)}>
              X??a
            </ButtonDelete>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Navbar />
      {/* Create */}
      <Overlay display={overlay}>
        <Form>
          <FormItem>
            <FormTitle>T???o ng?????i d??ng m???i</FormTitle>
          </FormItem>
          <FormItem>
            <FormLabel>T??n t??i kho???n:</FormLabel>
            <FormInput
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Email:</FormLabel>
            <FormInput type="text" onChange={(e) => setEmail(e.target.value)} />
          </FormItem>
          <FormItem>
            <FormLabel>M???t kh???u:</FormLabel>
            <FormInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormButton
              onClick={() => {
                setOverlay("none");
              }}
            >
              H???y
            </FormButton>
            <FormButton onClick={addUser}>Th??m</FormButton>
          </FormItem>
        </Form>
      </Overlay>
      {/* Edit */}
      <Overlay display={overlayEdit}>
        <Form>
          <FormItem>
            <FormTitle>Ch???nh s???a ng?????i d??ng</FormTitle>
          </FormItem>
          <FormItem>
            <FormLabel>T??n t??i kho???n:</FormLabel>
            <FormInput
              type="text"
              defaultValue={user.username}
              onBlur={(e) => setUsername(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Email:</FormLabel>
            <FormInput
              type="text"
              defaultValue={user.email}
              onBlur={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>M???t kh???u:</FormLabel>
            <FormInput
              type="password"
              defaultValue={user.password}
              onBlur={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Quy???n admin:</FormLabel>
            <select onChange={(e) => setIsAdmin(e.target.value)}>
              <option value="true">C??</option>
              <option value="false">Kh??ng</option>
            </select>
          </FormItem>
          <FormItem>
            <FormButton onClick={handleCancelEdit}>H???y</FormButton>
            <FormButton onClick={saveUser}>L??u</FormButton>
          </FormItem>
        </Form>
      </Overlay>
      <Title>Qu???n l?? ng?????i d??ng</Title>
      <ContainerButton>
        <ButtonCreate
          onClick={() => {
            setOverlay("flex");
          }}
        >
          T???o ng?????i d??ng m???i
        </ButtonCreate>
        <ButtonCreate onClick={reloadData}>T???i l???i</ButtonCreate>
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
export default UserManagement;
