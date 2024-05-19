import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";
import { API } from "../../../commom/const.api";
import { numberFormatText } from "../../../constant/common.constant";
import { axiosPrivate } from "../../../apis/configHttp";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [trending, setTrending] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(`${API}/dashboard/revenue`);
        const products = res.data?.data?.producs || [];
        setTrending(products);
      } catch {
        console.log("err");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Table">
      <h3 className="font-bold text-2xl mb-3">Sản phẩm bán chạy</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <h3 className="font-bold text-xl">Tên sản phẩm</h3>
              </TableCell>
              <TableCell align="left">
                <h3 className="font-bold text-xl">Giá</h3>
              </TableCell>
              <TableCell align="left">
                <h3 className="font-bold text-xl">Tồn kho</h3>
              </TableCell>
              <TableCell align="left">
                <h3 className="font-bold text-xl">Đã bán</h3>
              </TableCell>
              <TableCell align="left">
                <h3 className="font-bold text-xl">Tổng tiền</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "black" }}>
            {trending.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {numberFormatText(item.price)} đ
                </TableCell>
                <TableCell component="th" scope="row">
                  {numberFormatText(item.stockAmount)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {numberFormatText(item.totalAmount)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {numberFormatText(
                    (item.totalAmount || 0) * (item.price || 0)
                  )}
                  đ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
