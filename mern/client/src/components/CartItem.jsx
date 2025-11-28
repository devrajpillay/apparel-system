import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { increment, decrement } = useCart();
  return (
    <article className="card">
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 80, height: 80, borderRadius: '16px', objectFit: 'cover' }}
          />
        )}
        <div>
          <h3>{item.title}</h3>
          <p className="price">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="quantity-controls">
        <button className="icon secondary" onClick={() => decrement(item._id)} aria-label="Decrease quantity">
          −
        </button>
        <span className="quantity-pill">{item.quantity}</span>
        <button className="icon primary" onClick={() => increment(item._id)} aria-label="Increase quantity">
          +
        </button>
      </div>
    </article>
  );
}

