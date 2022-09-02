
import React, { useState, useEffect } from 'react'
import axios from 'axios';
let Styles = {
    List: { width: "18rem",padding:"2rem", marginLeft: "auto", marginRight: "auto" },
    Forms: {
        marginLeft: "auto",
         marginRight: "auto",
        width: "24rem",
        marginTop:"2rem",
        marginBottom:"2rem"
    },
    Inputbox:{
        width:"15rem",
        padding:"0.7rem 0.6rem",
        borderRadius:"20px",
        marginRight:"2rem",
        outline:"none",
        border:"1px solid white",
        boxShadow:"2px 3px 6px grey"
    },
    Buttonbox:{
        width:"5rem",
        padding:"0.45rem 0.2rem",
        borderRadius:"20px",
        outline:"none",
        background:"pink",
        color:"white",
        fontSize:"1.3rem",
        fontWeight:"bold",
        border:"1px solid pink",
        boxShadow:"2px 3px 6px pink"
    },
    ListType:{
        listStyleType: "none"
    }


}
export default function Home() {
    const [data, setData] = useState([]);
    const [inputNo, setInputNo] = useState("");

    let LoadData = async (inputNo) => {
        if (inputNo) {

            const Response = await axios.get(`http://117.217.126.114:8050/api/MenuMasters/GetMenuMasterList/${inputNo}`)
            setData(Response.data.data);
            if (Response.data.data.length === 0) {
                alert(`Data Not found for Ref ${inputNo}`)
            }
            console.log(Response.data.data);
        } else {
            const Response = await axios.get("http://117.217.126.114:8050/api/MenuMasters/GetMenuMasterList/174")
            setData(Response.data.data);
            console.log(Response.data.data);

        }


    };
    useEffect(() => {
        LoadData();
    }, []);

    let handleSubmit = (e) => {
        e.preventDefault();
        if (inputNo) {
            console.log(inputNo);
            LoadData(inputNo);
            setInputNo("");
        } else {
            alert("Please Enter valid Group Id")

        }

    };
    return (
        <div>
            <div style={Styles.Forms}>
                <form onSubmit={handleSubmit}>
                    <input style={Styles.Inputbox} type="number" value={inputNo} onChange={(e) => setInputNo(e.target.value)} placeholder="Enter a refGroup ..." />
                    <button style={Styles.Buttonbox} >Go</button>

                </form>
            </div>
            <div style={Styles.List}>
                {data &&
                    data.map((data, index) =>

                        <details key={index}>
                            <summary>{data.objectName}</summary>
                            <ul style={Styles.ListType}>
                                <li><strong>Ref Group : &nbsp;</strong>{data.refGroup}</li>
                                <li><strong>Order No. : &nbsp;</strong>{data.orderNum}</li>
                                <li><strong>Status : &nbsp;</strong>{data.isActive ? "Active":"Deactive" }</li>
                                <li><strong>Last Date : &nbsp;</strong>
                                    {new Date(`${data.entDate}`).toDateString()}
                                </li>
                            </ul>
                        </details>


                    )
                }
            </div>
        </div>
    )
}
