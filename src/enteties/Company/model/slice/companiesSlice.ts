import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanySchema, CompanyState } from "../types/CompanySchema";
import { useFuncs } from "../../lib/funcs";

const initialState: CompanyState = {
  companies: [],
  hasMore: true,
  areAllSelected: false,
};
const generateMockData = (start: number, count: number): CompanySchema[] => {
  const data: CompanySchema[] = [];
  for (let i = start; i < start + count; i++) {
    data.push({
      id: i,
      address: `Company address ${i}`,
      name: `Company name ${i}`,
      checked: false,
    });
  }
  return data;
};
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    loadCompanies: (
      state,
      action: PayloadAction<{ start: number; count: number }>
    ) => {
      const newCompanies = generateMockData(
        action.payload.start,
        action.payload.count
      ).map(
        (company) =>({...company, checked: state.areAllSelected})
      );

      state.companies = [...state.companies, ...newCompanies];
      if (state.companies.length >= 1000) {
        state.hasMore = false;
      }
    },
    toggleChecked: (state, action: PayloadAction<number>) => {
      const company = state.companies.find(
        (company) => company.id === action.payload
      );
      if (company) {
        company.checked = !company.checked;
      }
      if (state.companies.some(company => !company.checked)) {
        state.areAllSelected = false
      }
    },
    addNewCompany: (state, action: PayloadAction<CompanySchema>) => {
      const newCompany = action.payload;
      newCompany.checked = state.areAllSelected;
      state.companies = [newCompany, ...state.companies];
    },
    updateCompany: (state, action: PayloadAction<CompanySchema>) => {
      const newCompanyData = action.payload;
      const companyIndex = state.companies.findIndex(
        (company) => company.id === newCompanyData.id
      );
      if (companyIndex !== -1) {
        state.companies[companyIndex] = {
          ...state.companies[companyIndex],
          ...newCompanyData,
        };
      }
    },
    selectAll: (state, action: PayloadAction<boolean>) => {
      state.companies.forEach((company) => (company.checked = action.payload));
      state.areAllSelected = action.payload;
    },
    deleteSelected: (state) => {
      state.companies = state.companies.filter((company) => !company.checked);
      state.areAllSelected = false
    },
  },
});
export const { actions: companiesActions } = companySlice;
export const { reducer: companiesReducer } = companySlice;
