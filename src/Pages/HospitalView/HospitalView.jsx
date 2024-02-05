import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../Features/patientSlice";
import { fetchWards } from "../../Features/wardSlice";

const HospitalView = () => {
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state?.patients);
  const { wards } = useSelector((state) => state?.wards);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, []);

  const data = useMemo(() => {
    const totalPatients = patients?.length;
    const avgStay = patients?.reduce((acc, curr) => {
      return +(acc + curr?.stayDuration / totalPatients).toFixed(0);
    }, 0);
    const totalWardCapacity = wards.reduce(
      (acc, curr) => (acc += curr.capacity),
      0
    );
    const occupancyRate = ((totalPatients / totalWardCapacity) * 100).toFixed(
      0
    );
    const bestWard = [...wards].sort(
      (a, b) => b.patientsRecovered - a.patientsRecovered
    )[0];

    return { totalPatients, occupancyRate, avgStay, bestWard };
  }, [patients, wards]);

  return (
    <div>
      <h4>Hospital View</h4>
      <div className="d-flex flex-wrap justify-content-center mt-3 gap-4">
        <div className="card">
          <p className="m-0 title">Total Patients</p>{" "}
          <p className="m-0 value">{data?.totalPatients} people</p>
        </div>
        <div className="card">
          <p className="m-0 title">AVG Stay</p>{" "}
          <p className="m-0 value">{data?.avgStay} days</p>
        </div>
        <div className="card">
          <p className="m-0 title">Occupancy Rate</p>{" "}
          <p className="m-0 value">{data?.occupancyRate} %</p>
        </div>
        <div className="card">
          <p className="m-0 title">Best Ward</p>{" "}
          <p className="m-0 value">
            {data?.bestWard?.wardNumber} - {data?.bestWard?.specialization}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalView;
