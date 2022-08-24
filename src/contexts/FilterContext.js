import { createContext, useContext, useEffect, useReducer } from "react";
import { filterReducer } from "../reducers/filterReducer";

const initialState = {
  sort: "relevence",
  sizes: [],
  brands: [],
  idealFor: []
};

const FilterContext = createContext(initialState);

export function FilterProvider({ children }) {
  const [filters, dispatchFilter] = useReducer(filterReducer, initialState);
  useEffect(() => console.log(filters), [filters]);
  return (
    <FilterContext.Provider value={{ filters, dispatchFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
