import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";

export default function ShgView() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getAllSHGSettingById/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };
        getData();
    }, [id]);

    return (
        <div>
            <div className="container">
                <div className="row mt-2 pb-3">
                    <div className="my-3 d-flex justify-content-end mb-5">
                        <Link to={"/shg"}>
                            <button type="button" className="btn btn-sm btn-border">
                                Back
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row  mb-2 ">
                            <div className="col-6  ">
                                <p className="fw-medium">Shg Type</p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: {data.shgType}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row  mb-2 ">
                            <div className="col-6  ">
                                <p className="fw-medium">Shg Amount</p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: {data.shgAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
