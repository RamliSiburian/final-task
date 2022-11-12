import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex'

function ListArticle() {
    const [state, dispatch] = useContext(UserContext)

    let { data: articles } = useQuery("articlesCache", async () => {
        const response = await API.get("/Articles");
        // console.log(response.data.data);
        return response.data.data
    })

    return (
        <div className='List-article pb-5 '>
            <div className="container">
                <p className="fs-1 fw-bold text-center p-5">Artikel Hari Ini</p>
                <div className="article d-md-flex gap-5 flex-wrap">
                    {articles?.map((item, index) => {
                        return (
                            <Card style={{ width: '15rem', minHeight: "250px" }} className="card-article" key={index}>
                                {item?.image === "http://localhost:5000/Uploads/article/" ? (
                                    <Card.Img variant="top" src="./Assets/Image/noimage.png" alt="Gambar" />
                                ) : (
                                    <Card.Img variant="top" src={item?.image} alt="Gambar" />
                                )}
                                <Card.Body>
                                    <Card.Title>
                                        <Link to="/DetailArtikel" className='link fw-bold fs-5'>{item?.title}</Link>
                                    </Card.Title>
                                    <Card.Text style={{ textAlign: "justify" }}>
                                        {item?.desc}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListArticle;