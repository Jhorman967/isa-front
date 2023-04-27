import React, { useState, useCallback, useEffect } from "react";
import ModalComponent from "../../components/modal/modal";
import Table from "../table/Table";
import FormUser from "../../components/form-user/form-user";

import axios from "axios";
const base_url = process.env.REACT_APP_API_BACK_URL + "api/orders/read";

export default function Users() {

  const token = localStorage.getItem("token");
  console.log(token);
  const headers = { "x-access-token" : token };

  const [bucss, setBucs] = useState([]);

  useEffect(() => {
      const getBucss =  async () => {
        const response  = await axios.get(base_url, { headers: headers } );

        setBucs(response.data);
      }
      getBucss();
  },[]);

  console.log(bucss);

  const columns = React.useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {
            Header: "PO",
            accessor: "title",
            sortable: true,
          },
          {
            Header: "vendor",
            accessor: "vendor",
            sortable: true,
          },
          {
            Header: "location",
            accessor: "location",
            sortable: true,
          },
          {
            Header: "product",
            accessor: "product",
            sortable: true,
          },
          {
            Header: "price",
            accessor: "price",
            sortable: true,
          },
          {
            Header: "fob",
            accessor: "fob",
            sortable: true,
          },
          {
            Header: "start",
            accessor: "start",
            sortable: true,
          },
          {
            Header: "end",
            accessor: "end",
            sortable: true,
          },
          {
            Header: "droplocation",
            accessor: "droplocation",
            sortable: true,
          },
          {
            Header: "color",
            accessor: "color",
            sortable: true,
            Cell: (props) => {
              return (
                <div style={{ backgroundColor: props.value , color:props.value}}>{props.value}</div>
              );
            }
          },
          {
            Header: "consignee",
            accessor: "consignee",
            sortable: true,
            
          },
         //  {
         //    Header: "Action",
         //    id: "action",
         //    accessor: (originalRow, rowIndex) => {
         //      return (
         //        <div>
         //          <i
         //            style={{ cursor: "pointer" }}
         //            onClick={() => handleEdit({ originalRow, rowIndex })}
         //            className="fas fa-pencil-alt fa-fw"
         //          ></i>
         //          <i
         //            style={{ cursor: "pointer" }}
         //            onClick={() => handleDelete(rowIndex)}
         //            className="fas fa-lg fa-fw me-10px fa-trash-can"
         //          ></i>
         //        </div>
         //      );
         //    },
         //  },
        ],
      },
    ],
    []
  );

//   const handleDelete = useCallback(
//     (index) => {
//       setDataUsers(dataUsers.filter((v, i) => i !== index));
//     },
//     [dataUsers]
//   );

//   const handleEdit = ({ originalRow, rowIndex }) => {
//     setUserEdit({ originalRow, rowIndex });
//     setModalEditUser(true);
//   };


  return (
    <div>
      <h1 className="page-header">Bucs </h1>

      <Table
        columns={columns}
        data={bucss}
      />
    </div>
  );
}
