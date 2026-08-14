import MyLists from "./MyLists.tsx";
import React from "react";
import {ListCheck} from "react-bootstrap-icons";

function MyHome() {
    const handleCreateNewClick = async (event: React.FormEvent) => {
        event.preventDefault();
        window.location.href = "/list/create"
    }

    return (
        <>
            <div className={"d-flex justify-content-between my-3"}>
                <div>
                   <h4>My Lists</h4>
                </div>
                <button className={"btn btn-primary"} onClick={handleCreateNewClick}><ListCheck /> Create New</button>
            </div>
            <MyLists/>
        </>
    );
}

export default MyHome;
