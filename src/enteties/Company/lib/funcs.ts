import { useDispatch, useSelector } from "react-redux";
import { CompanySchema } from "../model/types/CompanySchema";
import { companiesActions } from "../model/slice/companiesSlice";
import { useCallback } from "react";
import { getCompanies } from "../model/selectors/getCompanies/getCompanies";
import { getHasMore } from "../model/selectors/getHasMore/getHasMore";
export const useFuncs = () => {
  const LOAD_MORE_COUNT = 10;
  const dispatch = useDispatch();
  const companies = useSelector(getCompanies);
  const hasMore = useSelector(getHasMore);
  const handleCheckboxChange = (id: number) => {
    dispatch(companiesActions.toggleChecked(id));
  };
  const loadMoreCompanies = useCallback(() => {
    if (hasMore) {
      dispatch(
        companiesActions.loadCompanies({
          start: companies.length,
          count: LOAD_MORE_COUNT,
        })
      );
    }
  }, [hasMore, companies.length, dispatch]);
  const handleScroll = useCallback(
    (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.currentTarget as HTMLDivElement;
      const bottom = scrollHeight - scrollTop <= clientHeight + 1;
      if (bottom && hasMore) {
        loadMoreCompanies();
      }
    },
    [hasMore, loadMoreCompanies]
  );
  const addNewCompany = useCallback(() => {
    const newCompany: CompanySchema = {
      name: ``,
      address: "",
      checked: false,
      id: Date.now(),
    };
    dispatch(companiesActions.addNewCompany(newCompany));
  }, [dispatch]);
  const handleCompanyChange = useCallback(
    (newCompanyData: CompanySchema): void => {
      dispatch(companiesActions.updateCompany(newCompanyData));
    },
    [dispatch]
  );
  const handleSelectAll = useCallback(
    (areAllChecked: boolean) => {
      dispatch(companiesActions.selectAll(areAllChecked));
    },
    [dispatch]
  );
  const handleDelete = useCallback(() => {
    dispatch(companiesActions.deleteSelected());
  }, [dispatch]);
  return {
    handleCheckboxChange,
    addNewCompany,
    handleCompanyChange,
    handleSelectAll,
    handleDelete,
    loadMoreCompanies,
    handleScroll,
  };
};
