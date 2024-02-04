import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateWard } from "../../Features/wardSlice";

function MyVerticallyCenteredModal({ show, onHide, ward }) {
  const dispatch = useDispatch();
  const [newWard, setNewWard] = useState({
    wardNumber: ward?.wardNumber,
    capacity: ward?.capacity,
    specialization: ward?.specialization,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { wardNumber, capacity, specialization } = newWard;
    const bool = wardNumber && capacity && specialization;

    if (bool) {
      dispatch(updateWard({ id: ward._id, newWard }));
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
            <label htmlFor="wardNumber">Ward Number: </label>
            <input
              type="text"
              id="wardNumber"
              name="wardNumber"
              placeholder="Ward Number"
              value={newWard.wardNumber}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="capacity">Capacity: </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Capacity"
              value={newWard.capacity}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="medicalHistory">Specialization: </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              placeholder="Specialization"
              value={newWard.specialization}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button className="btn btn-dark mt-2">Edit Ward</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditWard = ({ ward }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ward={ward}
      />
    </>
  );
};

export default EditWard;
