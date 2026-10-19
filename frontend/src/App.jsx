import { useEffect, useState } from "react";
import "./App.css";

const productImages = {
  1: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
  2: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",
  3: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  4: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
  5: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
  6: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
};

const categories = ["All", "Electronics", "Fashion", "Home"];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Products load nahi ho paaye. Please backend server check karo.");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const exists = previousCart.find((item) => item.id === product.id);

      if (exists) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="shop-app">
      <div className="announcement-bar">
        Discover everyday essentials made for you
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">S</span>
          <span>ShopEase<span className="brand-dot">.</span></span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-cart" href="#cart">
          <span className="cart-icon">♧</span>
          <span>Cart</span>
          <span className="cart-badge">{cartCount}</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR EVERYDAY, UPGRADED
            </span>

            <h1>
              Find your next
              <br />
              <span>favorite thing.</span>
            </h1>

            <p>
              Thoughtful picks, everyday essentials, and little things
              that make life better.
            </p>

            <a className="primary-button" href="#products">
              Explore products <span>↗</span>
            </a>

            <div className="hero-note">
              <span className="note-star">✳</span>
              Curated for your everyday life
            </div>
          </div>

          <div className="hero-visual">
            <img
              src={productImages[1]}
              alt="Premium headphones"
              className="hero-image"
            />
            <div className="floating-card">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Good finds.</strong>
                <p>Better everyday.</p>
              </div>
            </div>
            <div className="hero-image-caption">
              <span>THE EVERYDAY EDIT</span>
              <span>01 / 06</span>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MADE FOR YOUR LIFESTYLE</span>
              <h2>Explore our collection<span>.</span></h2>
              <p>Useful things. Lovely details. All in one place.</p>
            </div>

            <div className="product-count">
              {products.length.toString().padStart(2, "0")} PRODUCTS
            </div>
          </div>

          <div className="shop-toolbar">
            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-button ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          {loading && <p className="status-message">Loading products...</p>}
          {error && <p className="status-message error-message">{error}</p>}

          {!loading && !error && (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      src={productImages[product.id]}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    <span className="product-category">
                      {product.category}
                    </span>
                  </div>

                  <div className="product-details">
                    <div className="product-name-row">
                      <h3>{product.name}</h3>
                      <span className="product-star">✦</span>
                    </div>

                    <div className="product-bottom">
                      <span className="product-price">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span>+</span> Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filteredProducts.length === 0 && (
                <p className="status-message">
                  No products found. Try another search.
                </p>
              )}
            </div>
          )}
        </section>

        <section className="cart-section" id="cart">
          <div className="section-heading cart-heading">
            <div>
              <span className="eyebrow">YOUR PICKS</span>
              <h2>Your shopping bag<span>.</span></h2>
              <p>Everything you picked, all together.</p>
            </div>
            <span className="bag-count">{cartCount} items</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">♡</span>
              <h3>Your bag is waiting</h3>
              <p>Find something you love and add it to your bag.</p>
              <a className="secondary-button" href="#products">
                Browse products
              </a>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-row" key={item.id}>
                    <img
                      src={productImages[item.id]}
                      alt={item.name}
                      className="cart-product-image"
                    />

                    <div className="cart-product-info">
                      <span className="cart-item-category">
                        {item.category}
                      </span>
                      <h3>{item.name}</h3>
                      <p>{formatPrice(item.price)} each</p>
                    </div>

                    <div className="quantity-controls">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <strong className="cart-line-total">
                      {formatPrice(item.price * item.quantity)}
                    </strong>

                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>

              <aside className="order-summary">
                <h3>Order summary</h3>
                <div className="summary-line">
                  <span>Items ({cartCount})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery</span>
                  <span className="free-delivery">Free</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-total">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <p className="checkout-note">
                  Taxes and delivery details can be added later.
                </p>
              </aside>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <span className="about-symbol">S.</span>
          <div>
            <span className="eyebrow">A LITTLE ABOUT US</span>
            <h2>Everyday shopping, made simpler.</h2>
            <p>
              ShopEase brings your everyday essentials together in one
              simple, easy-to-explore place.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">S</span>
          <span>ShopEase<span className="brand-dot">.</span></span>
        </a>
        <p>Small finds. Everyday joy.</p>
        <span className="footer-copy">© 2026 ShopEase</span>
      </footer>
    </div>
  );
}

export default App;