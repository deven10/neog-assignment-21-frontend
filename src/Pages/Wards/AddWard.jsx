import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { addWard } from "../../Features/wardSlice";
import { useState } from "react";

function MyVerticallyCenteredModal({ show, onHide }) {
  const dispatch = useDispatch();
  const [ward, setWard] = useState({
    wardNumber: "",
    capacity: "",
    specialization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { wardNumber, capacity, specialization } = ward;
    const bool = wardNumber && capacity && specialization;
    if (bool) {
      dispatch(addWard(ward));
      onHide();
      setWard({
        wardNumber: "",
        capacity: "",
        specialization: "",
      });
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
              value={ward.wardNumber}
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
              value={ward.capacity}
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
              value={ward.specialization}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button className="btn btn-dark mt-2">Add New Ward</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const AddWard = ({}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Add New Ward
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddWard;
