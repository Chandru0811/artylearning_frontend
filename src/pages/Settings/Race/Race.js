import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../../config/URL";
import RaceAdd from "./RaceAdd";
import RaceEdit from "./RaceEdit";
import Delete from "../../../components/common/Delete";

const Race = () => {
    const tableRef = useRef(null);
    const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get("/getAllRaceSetting");
                setDatas(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        if (!loading) {
            initializeDataTable();
        }
        return () => {
            destroyDataTable();
        };
    }, [loading]);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          // DataTable already initialized, no need to initialize again
          return;
        }
        $(tableRef.current).DataTable({
          responsive: true,
          columnDefs: [
            { orderable: false, targets: -1 }
          ],
        });
      };

    const destroyDataTable = () => {
        const table = $(tableRef.current).DataTable();
        if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
            table.destroy();
        }
    };

    const refreshData = async () => {
        destroyDataTable();
        setLoading(true);
        try {
            const response = await api.get("/getAllRaceSetting");
            setDatas(response.data);
            initializeDataTable(); // Reinitialize DataTable after successful data update
        } catch (error) {
            console.error("Error refreshing data:", error);
        }
        setLoading(false);
    };

    return (
        <div className="container my-4">
            {/* {storedScreens?.levelCreate &&  */}
            <RaceAdd onSuccess={refreshData} />
            {/* } */}

            {loading ? (
                <div className="loader-container">
                    <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            ) : (
                <table ref={tableRef} className="display">
                    <thead>
                        <tr>
                            <th scope="col" style={{ whiteSpace: "nowrap" }}>S No</th>
                            <th scope="col" className="text-center">Race</th>
                            <th scope="col" className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-center">{data.race}</td>
                                <td className="text-end">
                                    {/* {storedScreens?.levelRead && ( */}
                                    {/* <Link to={`/race/view/${data.id}`}>
                                        <button className="btn btn-sm">
                                            <FaEye />
                                        </button>
                                    </Link> */}
                                    {/* )} */}
                                    {/* {storedScreens?.levelUpdate && ( */}
                                    <RaceEdit id={data.id} onSuccess={refreshData} />
                                    {/* )} */}
                                    {/* {storedScreens?.levelDelete && ( */}
                                    <Delete
                                        onSuccess={refreshData}
                                        path={`/deleteRaceSetting/${data.id}`}
                                    />
                                    {/* )} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    );
};

export default Race;
