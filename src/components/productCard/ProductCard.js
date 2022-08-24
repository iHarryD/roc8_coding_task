import "./ProductCard.styles.css";

export function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>
      <div className="product-text-area">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
        <div>
          {product.sizes.map((size) => (
            <span className="size-chip">{size}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
