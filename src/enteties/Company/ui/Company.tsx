import { memo, useEffect, useState } from "react";
import { CompanySchema } from "../model/types/CompanySchema";
import {
  handleCheckboxChange,
  handleCompanyUpdate,
} from "../model/types/funcsTypes";

interface CompanyProps {
  company: CompanySchema;
  changeCheckbox: handleCheckboxChange;
  changeCompanyData: handleCompanyUpdate;
}

export const Company = memo(
  ({ company, changeCompanyData, changeCheckbox }: CompanyProps) => {
    const [localCompany, setLocalCompany] = useState<CompanySchema>(company);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalCompany((prev) => ({ ...prev, name: e.target.value }));
    };
    const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalCompany((prev) => ({ ...prev, address: e.target.value }));
    };
    const saveChanges = () => {
      if (
        company.name === localCompany.name &&
        company.address === localCompany.address
      )
        return;
      changeCompanyData(localCompany);
    };
    useEffect(() => {
      setLocalCompany(company);
    }, [company]);
    return (
      <tr className={company.checked ? "checked" : ""}>
        <td className="selection">
          <input
            type="checkbox"
            checked={company.checked}
            onChange={() => changeCheckbox(company.id)}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Company name"
            value={localCompany.name}
            onChange={onNameChange}
            onBlur={saveChanges}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Company address"
            value={localCompany.address}
            onChange={onAddressChange}
            onBlur={saveChanges}
          />
        </td>
      </tr>
    );
  }
);
