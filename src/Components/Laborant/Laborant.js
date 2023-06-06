import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/joy/Table";
import {
  DeleteReport,
  GetRequest,
  PostRequest,
  UpdateReport,
} from "../../services/HttpServices";
import { Link } from "react-router-dom";
import { Button, FormLabel, Input, Textarea } from "@mui/joy";
import { Container, Form } from "reactstrap";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

function Laborant(){
    const [laborantList, setLaborantList] = useState([])

    const getLaborantList = () => {
        GetRequest("/laborant")
          .then((res) => {
            return res.json();
          })
          .then(
            (result) => {
              setLaborantList(result);
            },
            (error) => {
              console.log(error);
            }
          );
      };

      useEffect(() => {
        getLaborantList();
      }, []);

return (
    <div>
        <Table sx={{ "& tr > *:not(:first-child)": { textAlign: "right" } }}>
        <thead>
          <tr>
            <th>Laborant Hospital Number</th>
            <th>Laborant Name</th>
            <th>Laborant LastName</th>
          </tr>
        </thead>
        <tbody>
          {laborantList
            .map((laborant) => (
              <tr>
                <td>{laborant.id}</td>
                <td>{laborant.laborantName}</td>
                <td>{laborant.laborantLastName}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Link className="link"  to="/"><Button>Back To Main Page</Button></Link>
    </div>
)



}

export default Laborant;