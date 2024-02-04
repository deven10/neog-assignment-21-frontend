import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updatePatient } from "../../Features/patientSlice";

function MyVerticallyCenteredModal({ show, onHide, patient }) {
  const dispatch = useDispatch();
  const [newPatient, setNewPatient] = useState({
    name: patient?.name,
    age: patient?.age,
    gender: patient?.gender,
    medicalHistory: patient?.medicalHistory,
    contact: patient?.contact,
    assignedWard: patient?.assignedWard,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, gender, medicalHistory, contact, assignedWard } =
      newPatient;
    const bool =
      name && age && gender && medicalHistory && contact && assignedWard;

    if (bool) {
      dispatch(updatePatient({ id: patient._id, newPatient }));
      onHide();
    } else {
      toast.error("Fill all the fields!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-75 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <div className="d-flex flex-column w-100">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={newPatient.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={newPatient.age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="gender">Gender: </label>
            <select value={newPatient.gender} onChange={(e) => handleChange(e)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="medicalHistory">Medical History: </label>
            <input
              type="text"
              id="medicalHistory"
              name="medicalHistory"
              placeholder="Medical History"
              value={newPatient.medicalHistory}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="contact">Contact: </label>
            <input
              type="number"
              id="contact"
              name="contact"
              placeholder="Marks"
              value={newPatient.contact}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="assignedWard">Assigned Ward: </label>
            <select
              name="assignedWard"
              value={newPatient.assignedWard}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select Class</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </div>

          <button className="btn btn-dark mt-2">Edit Patient</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditPatient = ({ patient }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        patient={patient}
      />
    </>
  );
};

export default EditPatient;
