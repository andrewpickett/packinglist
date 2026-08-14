import React from "react";
import {PencilFill, XCircleFill} from "react-bootstrap-icons";

interface MyListProps {
    list: {name: string, id: number},
    modalShowFunc: (list : {name: string, id: number}) => void
}

function MyList({list, modalShowFunc} : MyListProps) {

    const handleOnClick = (event : React.MouseEvent<HTMLElement>) => {
        const clickElem = event.target as HTMLElement;
        console.log(clickElem.tagName.toLowerCase() + " -- " + (typeof event));
        if (clickElem.tagName.toLowerCase() === "div") {
            event.preventDefault();
            event.stopPropagation();
            window.location.href = "/list/" + list.id;
        }
    }

    const handleEditOnClick = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/list/" + list.id + "/edit";
    }

    return (
        <div className={"row pl-list-item"} onClick={handleOnClick}>
            <div className={"col-9 my-auto fw-bolder"}>{list.name}</div>
            <div className={"col text-end"}>
                <button type={"button"} className={"btn btn-success mx-2"} onClick={handleEditOnClick}><PencilFill /></button>
                <button type="button" className={"btn btn-danger"} onClick={() => modalShowFunc(list)}><XCircleFill/></button>
            </div>
        </div>
    );
}

export default MyList;
