import {Modal} from "react-bootstrap";

interface UnsavedModalProps {
    show: boolean
    closeFunc: () => void
}

function UnsavedModal({show, closeFunc} : UnsavedModalProps) {
    return (
        <Modal show={show} onHide={closeFunc}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to leave this page? Your changes will not be saved.</Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={closeFunc}>No</button>
                <button type="button" className="btn btn-danger" onClick={() => history.back()}>Yes, leave</button>
            </Modal.Footer>
        </Modal>
    )
}

export default UnsavedModal;
