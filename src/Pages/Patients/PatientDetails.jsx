import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, patient }) {
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Body className="text-center px-4">
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Name:
          </p>
          <p className="m-0">{patient.name}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Age:
          </p>
          <p className="m-0">{patient.age} years</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Gender:
          </p>
          <p className="m-0">{patient.gender}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Medical History:
          </p>
          <p className="m-0">{patient.medicalHistory}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Stay Duration:
          </p>
          <p className="m-0">{patient.stayDuration} days</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Contact:
          </p>
          <p className="m-0">{patient.contact}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Assigned Ward:
          </p>
          <p className="m-0">{patient.assignedWard}</p>
        </div>
        <button className="custom-btn mt-3" onClick={onHide}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

const PatientDetails = ({ patient }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Details
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        patient={patient}
      />
    </>
  );
};

export default PatientDetails;
