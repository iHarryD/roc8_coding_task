export function filterReducer(state, action) {
  switch (action.type) {
    case `SORT`:
      return { ...state, sort: action.payload.sort };
    case `ADD_TO_SIZES`:
      return { ...state, sizes: [...state.sizes, action.payload.size] };
    case `REMOVE_FROM_SIZES`:
      return {
        ...state,
        sizes: state.sizes.filter((size) => size !== action.payload.size)
      };
    case `ADD_TO_BRANDS`:
      return { ...state, brands: [...state.brands, action.payload.brand] };
    case `REMOVE_FROM_BRANDS`:
      return {
        ...state,
        brands: state.brands.filter((brand) => brand !== action.payload.brand)
      };
    case `ADD_TO_IDEAL_FOR`:
      return {
        ...state,
        idealFor: [...state.idealFor, action.payload.category]
      };
    case `REMOVE_FROM_IDEAL_FOR`:
      return {
        ...state,
        idealFor: state.idealFor.filter(
          (category) => category !== action.payload.category
        )
      };
    case "CLEAR":
      return {
        sort: "relevence",
        brands: [],
        sizes: [],
        idealFor: []
      };
    default:
      return state;
  }
}
