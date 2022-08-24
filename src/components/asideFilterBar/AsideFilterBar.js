import { useEffect, useState } from "react";
import { useFilter } from "../../contexts/FilterContext";
import "./AsideFilterBar.styles.css";
import { products } from "../../data/products";

export function AsideFilterBar() {
  const { filters, dispatchFilter } = useFilter();
  const [availableFilterOptions, setAvailableFilterOptions] = useState({
    sizes: [],
    brands: [],
    idealFor: []
  });

  function getAvailableFilterOptions() {
    const availableFilterOptions = products.reduce(
      (acc, product) => {
        product.sizes.forEach((size) =>
          acc.sizes.includes(size) ? null : acc.sizes.push(size)
        );
        product.idealFor.forEach((category) =>
          acc.idealFor.includes(category) ? null : acc.idealFor.push(category)
        );
        acc.brands.includes(product.brand)
          ? null
          : acc.brands.push(product.brand);
        return acc;
      },
      {
        sizes: [],
        brands: [],
        idealFor: []
      }
    );
    return availableFilterOptions;
  }

  useEffect(() => setAvailableFilterOptions(getAvailableFilterOptions()), [
    filters
  ]);

  function handleSort(e) {
    dispatchFilter({
      type: "SORT",
      payload: { sort: e.target.value }
    });
  }

  function handleFilterCheckbox(e) {
    const filterType = e.target.getAttribute("data-filter-type");
    const payloadKey = e.target.getAttribute("data-payload-key");
    dispatchFilter({
      type: e.target.checked
        ? `ADD_TO_${filterType.toUpperCase()}`
        : `REMOVE_FROM_${filterType.toUpperCase()}`,
      payload: { [payloadKey]: e.target.value }
    });
  }

  return (
    <aside className="filter-bar">
      <button
        className="clear-filters-button"
        onClick={() => dispatchFilter({ type: "CLEAR" })}
      >
        Clear
      </button>
      <div className="filter-bar-section">
        <p className="filter-bar-section-heading">Sort by: </p>
        <div className="filter-options-container">
          <label>
            <input
              type="radio"
              name="price-sort"
              value="relevence"
              checked={filters.sort === "relevence"}
              onChange={(e) => handleSort(e)}
            />{" "}
            Relevance
          </label>
          <label>
            <input
              type="radio"
              name="price-sort"
              value="high-to-low"
              checked={filters.sort === "high-to-low"}
              onChange={(e) => handleSort(e)}
            />{" "}
            Price: high to low
          </label>
          <label>
            <input
              type="radio"
              name="price-sort"
              value="low-to-high"
              checked={filters.sort === "low-to-high"}
              onChange={(e) => handleSort(e)}
            />{" "}
            Price: low to high
          </label>
        </div>
      </div>
      <div className="filter-bar-section">
        <p className="filter-bar-section-heading">Size: </p>
        <div className="filter-options-container size-filter-options-container">
          {availableFilterOptions.sizes.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                data-filter-type="sizes"
                data-payload-key="size"
                value={size}
                checked={filters.sizes.includes(size)}
                onChange={(e) => handleFilterCheckbox(e)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-bar-section">
        <p className="filter-bar-section-heading">Brands: </p>
        <div className="filter-options-container">
          {availableFilterOptions.brands.map((brand) => (
            <label key={brand}>
              <input
                type="checkbox"
                data-filter-type="brands"
                data-payload-key="brand"
                value={brand}
                checked={filters.brands.includes(brand)}
                onChange={(e) => handleFilterCheckbox(e)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-bar-section">
        <p className="filter-bar-section-heading">Ideal for: </p>
        <div className="filter-options-container">
          {availableFilterOptions.idealFor.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                data-filter-type="ideal_for"
                data-payload-key="category"
                value={category}
                checked={filters.idealFor.includes(category)}
                onChange={(e) => handleFilterCheckbox(e)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
