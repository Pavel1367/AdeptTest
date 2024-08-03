import { Company } from "./Company";
import { useFuncs } from "../lib/funcs";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../model/selectors/getCompanies/getCompanies";
import { useEffect, useMemo, useRef } from "react";
import { companiesActions } from "../model/slice/companiesSlice";
export const Table = () => {
  const INITIAL_LOAD_COUNT = 20;
  const dispatch = useDispatch();
  const {
    addNewCompany,
    handleCheckboxChange,
    handleCompanyChange,
    handleSelectAll,
    handleDelete,
    handleScroll,
  } = useFuncs();

  const companies = useSelector(getCompanies);
  const containerRef = useRef<HTMLDivElement>(null);
  const areAllChecked = useMemo(() => {
    return companies.every((company) => company.checked);
  }, [companies]);
  const hasSelectedCompanies = useMemo(
    () => companies.some((company) => company.checked),
    [companies]
  );
  useEffect(() => {
    dispatch(
      companiesActions.loadCompanies({ start: 0, count: INITIAL_LOAD_COUNT })
    );
  }, [dispatch]);
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll",  handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll",  handleScroll);
      }
    };
  });
  if (!companies.length) {
    return (
      <div className="table_component">
        <div className="table_actions">
          <button className="add_btn" onClick={addNewCompany}>
            add new company
          </button>
          <button
            className="delete_btn"
            onClick={handleDelete}
            disabled={!hasSelectedCompanies}
          >
            Delete selected
          </button>
        </div>
        <div className="table_wrap flex center">
          <h2>No any companies found(</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="table_component">
      <div className="table_actions">
        <button className="add_btn" onClick={addNewCompany}>
          Add new company
        </button>
        <button
          className="delete_btn"
          onClick={handleDelete}
          disabled={!hasSelectedCompanies}
        >
          Delete selected
        </button>
      </div>
      <div className="table_wrap" ref={containerRef}>
        <table className="table">
          <thead className="table_head">
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={areAllChecked}
                    onChange={(e) => handleSelectAll(!areAllChecked)}
                  />
                  Select All
                </label>
              </th>
              <th colSpan={2}>
                <h2>Companies</h2>
              </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {companies.map((company) => (
              <Company
                changeCompanyData={handleCompanyChange}
                changeCheckbox={handleCheckboxChange}
                key={company.id}
                company={company}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
