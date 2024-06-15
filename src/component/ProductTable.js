import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.brand}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>{currencyFormat(item.salePrice)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th>{item.isNew ? "O" : "X"}</th>
                <th>{item.choice ? "O" : "X"}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    className="delete-button"
                    onClick={() => deleteItem(item._id)}
                  >
                    -
                  </Button>
                  <Button className="edit-button" size="sm" onClick={() => openEditForm(item)}>
                    수정
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
