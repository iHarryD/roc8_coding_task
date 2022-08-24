import { useEffect, useState } from "react";
import { AsideFilterBar } from "./components/asideFilterBar/AsideFilterBar";
import { ProductCard } from "./components/productCard/ProductCard";
import { useFilter } from "./contexts/FilterContext";
import { products } from "./data/products";
import "./styles.css";

export default function App() {
  const [inViewProducts, setInViewProducts] = useState({
    original: products,
    filtered: products
  });
  const { filters } = useFilter();

  useEffect(() => {
    let filteredProducts = inViewProducts.original;
    if (filters.sort === "high-to-low") {
      filteredProducts.sort((productOne, productTwo) => {
        if (productOne.price > productTwo.price) {
          return -1;
        } else if (productTwo.price > productOne.price) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (filters.sort === "low-to-high") {
      filteredProducts.sort((productOne, productTwo) => {
        if (productOne.price > productTwo.price) {
          return 1;
        } else if (productTwo.price > productOne.price) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    if (filters.sizes.length) {
      filteredProducts = filteredProducts.filter((product) => {
        let hasSize = false;
        product.sizes.forEach((size) => {
          if (filters.sizes.includes(size)) {
            hasSize = true;
            return;
          }
        });
        return hasSize;
      });
    }
    if (filters.brands.length) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }
    if (filters.idealFor.length) {
      filteredProducts = filteredProducts.filter((product) => {
        let hasCategory = false;
        product.idealFor.forEach((category) => {
          if (filters.idealFor.includes(category)) {
            hasCategory = true;
            return;
          }
        });
        return hasCategory;
      });
    }
    setInViewProducts((prev) => ({ ...prev, filtered: filteredProducts }));
  }, [filters, inViewProducts.original]);

  return (
    <div className="App">
      <AsideFilterBar />
      <div className="cards-container">
        {inViewProducts.filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
