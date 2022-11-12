import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex';

function ReservasiData() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);


    let { data: consultData, refetch } = useQuery("consultDataCache", async () => {
        const response = await API.get("/Consults");
        return response.data.data;
    })

    return (
        <>
            <Container>
                <div className="product">
                    <p className="h1 mt-4">List Product</p>
                    <hr />
                    <div className="add-produc text-end mb-3">
                        <Link to={"/AddArticle"} className="btn btn-primary">Add Article <Icon.FaPlusCircle /></Link>
                    </div>
                    {consultData?.length !== 0 ? (
                        <Table striped bordered hover variant='primary'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Hastag</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultData?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td className="align-middle text-center">{index + 1}</td>
                                        <td className="align-middle">
                                            {item?.fullname}
                                        </td>
                                        <td className="align-middle">{item?.title}</td>
                                        <td className="align-middle">
                                            {item?.desc}
                                        </td>
                                        <td className="align-middle">{item?.hastag}</td>
                                        <td className="align-middle text-center">
                                            <Icon.FaSearch
                                                onClick={() => {
                                                    navigate("/EditArticle/" + item?.id);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="text-center pt-5">
                            <img
                                src="./Assets/Image/noimage.png"
                                className="img-fluid rounded"
                                style={{ width: "20%" }}
                                alt="empty"
                            />
                            <div className="mt-3 text-danger fw-bold fs-3">No data product</div>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}

export default ReservasiData;