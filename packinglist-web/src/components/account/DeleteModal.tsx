import React from "react";
import {Modal} from "react-bootstrap";


interface DeleteModalProps {
    list: {name: string, id: number} | null,
    deleteFunc: (event: React.MouseEvent<HTMLElement>, listId: number | undefined) => void,
    closeFunc: () => void
}

function DeleteModal({list, deleteFunc, closeFunc} : DeleteModalProps) {

    return (
        <Modal show={list !== null} onHide={closeFunc}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {list?.name}?</Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={closeFunc}>No</button>
                <button type="button" className="btn btn-danger" onClick={(e) => deleteFunc(e, list?.id)}>Yes, delete</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal;
