import { useMemo } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { items, addItem, increment, decrement } = useCart();
  const cartItem = useMemo(
    () => items.find((item) => item.productId === product.productId),
    [items, product.productId]
  );

  return (
    <article className="card">
      <img src={product.image} alt={product.title} loading="lazy" />
      <div>
        <h3>{product.title}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
      </div>

      {cartItem ? (
        <div className="quantity-controls">
          <button
            className="icon secondary"
            onClick={() => decrement(cartItem._id)}
            aria-label={`Decrease ${product.title}`}
          >
            −
          </button>
          <span className="quantity-pill">{cartItem.quantity}</span>
          <button
            className="icon primary"
            onClick={() => increment(cartItem._id)}
            aria-label={`Increase ${product.title}`}
          >
            +
          </button>
        </div>
      ) : (
        <div className="actions">
          <button className="primary" onClick={() => addItem(product)}>
            Add to cart
          </button>
        </div>
      )}
    </article>
  );
}

