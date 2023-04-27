import React, { useState, useCallback, useEffect } from "react";
import ModalComponent from "../../components/modal/modal";
import Table from "../table/Table";
import FormUser from "../../components/form-user/form-user";

import axios from "axios";
const base_url = process.env.REACT_APP_API_BACK_URL + "api/users/all"

export default function Users() {

  const token = localStorage.getItem("token");
  console.log(token);
  const headers = { "x-access-token" : token };

  const [userss, setUser] = useState([]);

  useEffect(() => {
      const getUser =  async () => {
        const response  = await axios.get(base_url, { headers: headers } );

        setUser(response.data);
      }
      getUser();
  },[]);

  console.log(userss);

  const columns = React.useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {
            Header: "id",
            accessor: "id",
            sortable: true,
          },
          {
            Header: "username",
            accessor: "username",
            sortable: true,
          },
          {
            Header: "email",
            accessor: "email",
            sortable: true,
          },
          {
            Header: "createdAt",
            accessor: "createdAt",
            sortable: true,
          },
          {
            Header: "updatedAt",
            accessor: "updatedAt",
            sortable: true,
          },
          {
            Header: "Action",
            id: "action",
            accessor: (originalRow, rowIndex) => {
              return (
                <div>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit({ originalRow, rowIndex })}
                    className="fas fa-pencil-alt fa-fw"
                  ></i>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(rowIndex)}
                    className="fas fa-lg fa-fw me-10px fa-trash-can"
                  ></i>
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState();
  const [dataUsers, setDataUsers] = useState([
    {
      age: 13,
      firstName: "Cristian",
      lastName: "Hernandez",
      progress: 74,
      status: "single",
      subRows: undefined,
      visits: 27,
    },
    {
      age: 15,
      firstName: "Esteban",
      lastName: "Barrero",
      progress: 74,
      status: "single",
      subRows: undefined,
      visits: 27,
    },
    {
      age: 17,
      firstName: "Nicolas",
      lastName: "Martinez",
      progress: 74,
      status: "single",
      subRows: undefined,
      visits: 27,
    },
    {
      age: 19,
      firstName: "Nena",
      lastName: "Saenz",
      progress: 74,
      status: "single",
      subRows: undefined,
      visits: 27,
    },
  ]);

  const handleDelete = useCallback(
    (index) => {
      setDataUsers(dataUsers.filter((v, i) => i !== index));
    },
    [dataUsers]
  );
  const handleEdit = ({ originalRow, rowIndex }) => {
    setUserEdit({ originalRow, rowIndex });
    setModalEditUser(true);
  };

  const addUser = () => {
    return <FormUser setDataUsers={setDataUsers} toggle={setModalAddUser} />;
  };

  const editUser = () => {
    return (
      <FormUser
        userEdit={userEdit}
        setDataUsers={setDataUsers}
        toggle={setModalEditUser}
      />
    );
  };

  return (
    <div>
      {/* <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item">
          <Link to="/table/data">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/table/data">Tables</Link>
        </li>
        <li className="breadcrumb-item active">Data Tables</li>
      </ol> */}
      <h1 className="page-header">Usuarios </h1>

      <Table
        columns={columns}
        data={userss}
        setOpenModal={setModalAddUser}
        // btnAgregar={"Usuario"}
      />

      <ModalComponent
        isOpen={modalAddUser}
        size={"lg"}
        toggle={setModalAddUser}
        dataModal={addUser}
      />
      {/* <FormUser /> */}

      <ModalComponent
        isOpen={modalEditUser}
        size={"lg"}
        toggle={setModalEditUser}
        dataModal={editUser}
      />
      {/* <FormUser /> */}
    </div>
  );
}
