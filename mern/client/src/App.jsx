import { CartProvider, useCart } from './context/CartContext.jsx';
import ProductCard from './components/ProductCard.jsx';
import CartItem from './components/CartItem.jsx';

const products = [
  {
    productId: 'sweater-rose',
    title: 'Mélange Cashmere Sweater',
    price: 320,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
  },
  {
    productId: 'track-pearl',
    title: 'Cashmere Track Pants',
    price: 210,
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600',
  },
  {
    productId: 'chronograph-noir',
    title: 'Padovesi Chronograph',
    price: 540,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
  },
];

function Layout() {
  const { items, total, loading, error } = useCart();
  return (
    <div className="app-shell">
      <div className="glass-card">
        <header>
          <p className="eyebrow">Concierge Cart</p>
          <h1 className="page-title">Select pieces. Tap + or − to adjust.</h1>
          {error && <p style={{ color: '#ff5f5f' }}>{error}</p>}
        </header>

        <section className="products-section">
          <h2>Featured pieces</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </section>

        <section className="cart-section" style={{ marginTop: '2rem' }}>
          <h2>Your cart</h2>
          {loading ? (
            <p>Loading cart…</p>
          ) : items.length === 0 ? (
            <p className="empty">Cart is empty. Add a product to see it here.</p>
          ) : (
            <>
              <div className="cart-grid">
                {items.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <p style={{ fontSize: '1.1rem' }}>
                  <strong>Total:</strong> ${total.toFixed(2)}
                </p>
                <button className="primary">Checkout</button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Layout />
    </CartProvider>
  );
}

