import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex';

function ListConsultation() {
    const [state, dispatch] = useContext(UserContext);
    // console.log("state here", state);

    let { data: consult } = useQuery("consultCache", async () => {
        const response = await API.get("/ConsultByUser/" + state.user.id);
        // console.log(response.data.data);
        return response.data.data
    })
    let { data: userreplay } = useQuery("usersreplayCache", async () => {
        const response = await API.get("/User/" + state.user.id)
        return response.data.data
    })

    return (
        <div className='List-article pb-5 '>
            <div className="container">
                <p className="fs-1 fw-bold text-danger mt-4">Consultation</p>
                <div className=" ">
                    {consult?.map((item, index) => {
                        return (
                            <div className='mb-4 p-3 rounded shadow'>
                                <div className=' d-md-flex gap-5' key={index}
                                    style={{ background: "#fff" }}
                                >
                                    <div className="img d-flex align-items-center">
                                        <img src={userreplay?.image} alt="user" style={{ width: "75px", height: "75px", marginLeft: "20px", borderRadius: "50%" }} />
                                    </div>
                                    <div className="detail">
                                        <p className="fs-4 fw-bold m-0">{item?.subject}</p>
                                        <p style={{ fontSize: "12px", margin: "0" }}>{item?.create_at}</p>
                                        <p className="fs-6 m-0">{item?.description}. <a href={item?.link}>Here</a></p>
                                    </div>
                                    <div className="live align-items-end">
                                        <p className=" fs-5 fw-bold">{item?.live_consultation} </p>
                                    </div>
                                </div>
                                <hr />

                                <div className="replay d-flex gap-3 align-items-center">
                                    <div className="img d-flex align-items-center" style={{ marginLeft: "120px" }}>
                                        <img src="./Assets/Image/noimage.png" alt="user" style={{ width: "75px", height: "75px", marginLeft: "20px", borderRadius: "50%" }} />
                                    </div>
                                    <div className="detail">
                                        {item?.replay === "" ? (
                                            <p className='fs-4'>Waiting For Replay</p>
                                        ) : (
                                            <p className="fs-6 m-0">{item?.replay}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default ListConsultation;