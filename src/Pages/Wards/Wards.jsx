import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchWards } from "../../Features/wardSlice";
import AddWard from "./AddWard";
import ReactTable from "../../Templates/Table";
import WardDetails from "./WardDetails";
import EditWard from "./EditWard";
import DeleteWard from "./DeleteWard";

const Wards = () => {
  const dispatch = useDispatch();
  const { loading, wards } = useSelector((state) => state?.wards);

  useEffect(() => {
    dispatch(fetchWards());
  }, []);

  const tableColumns = [
    {
      Header: "Sr no.",
      accessor: "job_id",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Ward Number",
      accessor: "wardNumber",
    },
    {
      Header: "Capacity",
      accessor: "capacity",
    },
    {
      Header: "Specialization",
      accessor: "specialization",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <WardDetails ward={row.original} />
          <EditWard ward={row.original} />
          <DeleteWard ward={row.original} />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => wards, [wards]);

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
    "Ward Number",
    "Capacity",
    "Specialization",
    "Actions",
  ];

  return (
    <div>
      <h4>Wards</h4>
      <div className="d-flex justify-content-start">
        <AddWard />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : wards?.length > 0 ? (
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

export default Wards;
