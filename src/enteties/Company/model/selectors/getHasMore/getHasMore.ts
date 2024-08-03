import { RootState } from "../../../../../App/store/config/store";

export const getHasMore = (state: RootState) => state.companies.hasMore;
