import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchPatients } from "../../Features/patientSlice";
import { fetchWards } from "../../Features/wardSlice";
import AddPatient from "./AddPatient";
import ReactTable from "../../Templates/Table";
import PatientDetails from "./PatientDetails";
import EditPatient from "./EditPatient";
import DeletePatient from "./DeletePatient";

const Patients = () => {
  const dispatch = useDispatch();
  const { loading, patients } = useSelector((state) => state?.patients);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, []);

  const tableColumns = [
    {
      Header: "Sr no.",
      accessor: "job_id",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Medical History",
      accessor: "medicalHistory",
    },
    {
      Header: "Assigned Ward",
      accessor: "assignedWard",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <PatientDetails patient={row.original} />
          <EditPatient patient={row.original} />
          <DeletePatient patient={row.original} />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => patients, [patients]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const columnHeaders = [
    "Sr no",
    "Name",
    "Age",
    "Gender",
    "Medical History",
    "Assigned Ward",
    "Actions",
  ];

  return (
    <div>
      <h4>Patients</h4>
      <div className="d-flex justify-content-start">
        <AddPatient />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : patients?.length > 0 ? (
          <>
            <ReactTable tableInstance={tableInstance} />
          </>
        ) : (
          <p className="mt-4 fs-5 text-start">No data found!</p>
        )}
      </div>
    </div>
  );
};

export default Patients;
