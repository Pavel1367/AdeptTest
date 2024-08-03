export interface CompanySchema{
    id: number;
    name: string;
    address: string;
    checked: boolean;
}
export interface CompanyState{
    companies: CompanySchema[]
    hasMore: boolean
    areAllSelected: boolean
}