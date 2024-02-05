import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, ward }) {
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Body className="text-center px-4">
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Ward Number:
          </p>
          <p className="m-0">{ward.wardNumber}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Capacity:
          </p>
          <p className="m-0">{ward.capacity}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Patients Recovered:
          </p>
          <p className="m-0">{ward.patientsRecovered}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Specialization:
          </p>
          <p className="m-0">{ward.specialization}</p>
        </div>
        <button className="custom-btn mt-3" onClick={onHide}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

const WardDetails = ({ ward }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Details
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ward={ward}
      />
    </>
  );
};

export default WardDetails;
