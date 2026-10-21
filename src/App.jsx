
import { useState } from "react";
import Login from "./Login";
import "./App.css";

const products = [
  { id: 1, name: "Premium Office Chair", category: "Office", price: 8999, icon: "🪑", supplier: "Urban Office Solutions" },
  { id: 2, name: "Business Laptop", category: "Electronics", price: 54999, icon: "💻", supplier: "TechWorld Suppliers" },
  { id: 3, name: "Executive Desk", category: "Office", price: 12999, icon: "🖥️", supplier: "OfficeHub India" },
  { id: 4, name: "Wireless Keyboard", category: "Electronics", price: 2499, icon: "⌨️", supplier: "TechWorld Suppliers" },
  { id: 5, name: "Packaging Boxes", category: "Packaging", price: 799, icon: "📦", supplier: "PackPro Industries" },
  { id: 6, name: "Business Backpack", category: "Accessories", price: 1999, icon: "🎒", supplier: "Corporate Essentials" },
  { id: 7, name: "Business Printer", category: "Electronics", price: 8999, icon: "🖨️", supplier: "TechWorld Suppliers" },
  { id: 8, name: "Marketing Notebook", category: "Office", price: 499, icon: "📓", supplier: "OfficeHub India" },
];

const quotations = [
  { id: 1, supplier: "CottonCraft Industries", rating: "4.8", price: 245, delivery: "7 Days", quantity: "500 Pieces", verified: true },
  { id: 2, supplier: "TextileHub India", rating: "4.6", price: 270, delivery: "5 Days", quantity: "500 Pieces", verified: true },
  { id: 3, supplier: "FashionBulk Suppliers", rating: "4.5", price: 255, delivery: "10 Days", quantity: "500 Pieces", verified: false },
];

const categories = ["All", "Office", "Electronics", "Packaging", "Accessories"];

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showRequirement, setShowRequirement] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [acceptedQuote, setAcceptedQuote] = useState(null);
  const [requirement, setRequirement] = useState({
    product: "",
    quantity: "",
    budget: "",
    description: "",
  });

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.supplier.toLowerCase().includes(query);

    const categoryMatch =
      category === "All" || product.category === category;

    return searchMatch && categoryMatch;
  });

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((currentCart) =>
      currentCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const cartTotal = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const submitRequirement = (e) => {
    e.preventDefault();
    setShowRequirement(false);
    setShowQuotes(true);
  };

  if (showLogin) {
    return (
      <div>
        <button
          onClick={() => setShowLogin(false)}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1000,
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
        <Login />
      </div>
    );
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Bizora</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="nav-btn" onClick={() => setShowLogin(true)}>
            Login
          </button>

          <button
            className="nav-btn"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            Smart B2B <span>Marketplace</span>
          </h1>

          <p>
            Discover trusted suppliers, compare quotations and
            source products for your business with Bizora.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={scrollToProducts}>
              Explore Products
            </button>

            <button
              className="secondary-btn"
              onClick={() => setShowRequirement(true)}
            >
              Post Your Requirement
            </button>
          </div>
        </div>

        <div className="hero-card">
          <h3>Find what your business needs</h3>

          <input
            className="search-box"
            type="text"
            placeholder="Search products or suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") scrollToProducts();
            }}
          />

          <button
            className="primary-btn"
            style={{ marginTop: 10, width: "100%" }}
            onClick={scrollToProducts}
          >
            Search Products
          </button>

          <p>
            Search products or post your requirement to receive
            supplier quotations.
          </p>
        </div>
      </section>

      {/* REQUIREMENT BANNER */}
      <section
        style={{
          margin: "40px 7%",
          padding: 35,
          borderRadius: 18,
          background: "#eef2ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ marginBottom: 8 }}>Can't find what you need?</h2>
          <p style={{ color: "#6b7280" }}>
            Post your requirement and let suppliers compete with
            their best quotations.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowRequirement(true)}
        >
          + Post Requirement
        </button>
      </section>

      {/* CATEGORIES */}
      <section className="section" id="categories">
        <div className="section-title">
          <h2>Browse Categories</h2>
          <p>Find products according to your business needs.</p>
        </div>

        <div className="categories">
          {[
            ["Office", "🏢", "Office supplies & furniture"],
            ["Electronics", "💻", "Business electronics"],
            ["Packaging", "📦", "Packaging solutions"],
            ["Accessories", "🎒", "Business accessories"],
          ].map(([name, icon, description]) => (
            <div
              className="category-card"
              key={name}
              onClick={() => {
                setCategory(name);
                scrollToProducts();
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="category-icon">{icon}</div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section products" id="products">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Quality products from trusted suppliers.</p>
        </div>

        <input
          type="text"
          className="search-box"
          placeholder="Search by product, category or supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            display: "block",
            maxWidth: 500,
            width: "100%",
            margin: "0 auto 20px",
            padding: 14,
            border: "1px solid #d1d5db",
            borderRadius: 8,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 30,
          }}
        >
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid #4f46e5",
                cursor: "pointer",
                background: category === item ? "#4f46e5" : "white",
                color: category === item ? "white" : "#4f46e5",
                fontWeight: 600,
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", padding: 30 }}>
            No products found. Try another search.
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">{product.icon}</div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>

                  <small style={{ color: "#6b7280" }}>
                    Supplier: {product.supplier}
                  </small>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 15,
                    }}
                  >
                    <span className="price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        background: "#4f46e5",
                        color: "white",
                        border: "none",
                        padding: "9px 14px",
                        borderRadius: 7,
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="section-title">
          <h2>How Bizora B2B Works</h2>
          <p>Simple buying process for businesses.</p>
        </div>

        <div className="categories">
          <div className="category-card">
            <div className="category-icon">📝</div>
            <h3>1. Post Requirement</h3>
            <p>Tell suppliers what your business needs.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">💰</div>
            <h3>2. Get Quotations</h3>
            <p>Suppliers submit their best prices.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">⚖️</div>
            <h3>3. Compare</h3>
            <p>Compare price, rating and delivery time.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🤝</div>
            <h3>4. Choose Supplier</h3>
            <p>Accept the quotation that suits you best.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="about">
        <h2>Ready to grow your business?</h2>
        <p>
          Connect with verified suppliers and get competitive quotations.
        </p>
        <button onClick={() => setShowRequirement(true)}>
          Post Your Requirement
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Bizora. Smart B2B Marketplace.</p>
      </footer>

      {/* CART MODAL */}
      {showCart && (
        <div style={overlayStyle} onClick={() => setShowCart(false)}>
          <div
            style={{ ...modalStyle, width: 600 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCart(false)}
              style={closeStyle}
              aria-label="Close cart"
            >
              ×
            </button>

            <h2>🛒 Your Shopping Cart</h2>

            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <p>Your cart is empty.</p>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setShowCart(false);
                    scrollToProducts();
                  }}
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <>
                {cart.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: "15px 0",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <div>
                      <strong>
                        {product.icon} {product.name}
                      </strong>
                      <p style={{ color: "#6b7280", marginTop: 5 }}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(index)}
                      style={{
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 10px",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <h3 style={{ marginTop: 20 }}>
                  Total: ₹{cartTotal.toLocaleString("en-IN")}
                </h3>

                <button
                  className="primary-btn"
                  style={{ width: "100%", marginTop: 20 }}
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* REQUIREMENT MODAL */}
      {showRequirement && (
        <div style={overlayStyle} onClick={() => setShowRequirement(false)}>
          <div
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRequirement(false)}
              style={closeStyle}
            >
              ×
            </button>

            <h2>Post Your Requirement</h2>
            <p style={{ color: "#6b7280", marginBottom: 25 }}>
              Tell suppliers exactly what your business needs.
            </p>

            <form onSubmit={submitRequirement}>
              <input
                style={inputStyle}
                placeholder="Product / Service Name"
                value={requirement.product}
                onChange={(e) =>
                  setRequirement({ ...requirement, product: e.target.value })
                }
                required
              />

              <input
                style={inputStyle}
                placeholder="Required Quantity"
                value={requirement.quantity}
                onChange={(e) =>
                  setRequirement({ ...requirement, quantity: e.target.value })
                }
                required
              />

              <input
                style={inputStyle}
                placeholder="Budget per unit (₹)"
                value={requirement.budget}
                onChange={(e) =>
                  setRequirement({ ...requirement, budget: e.target.value })
                }
                required
              />

              <textarea
                style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                placeholder="Describe your requirement..."
                value={requirement.description}
                onChange={(e) =>
                  setRequirement({
                    ...requirement,
                    description: e.target.value,
                  })
                }
                required
              />

              <button
                type="submit"
                className="primary-btn"
                style={{ width: "100%" }}
              >
                Submit Requirement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QUOTATIONS MODAL */}
      {showQuotes && (
        <div style={overlayStyle} onClick={() => setShowQuotes(false)}>
          <div
            style={{ ...modalStyle, width: 850 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQuotes(false)}
              style={closeStyle}
            >
              ×
            </button>

            <h2>Supplier Quotations</h2>
            <p style={{ color: "#6b7280" }}>
              Requirement: {requirement.product || "Cotton T-Shirts"} | Quantity:{" "}
              {requirement.quantity || "500 Pieces"}
            </p>

            <div style={{ marginTop: 25, display: "grid", gap: 15 }}>
              {quotations.map((quote) => (
                <div
                  key={quote.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 20,
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <div>
                    <h3>{quote.supplier}</h3>
                    <p
                      style={{
                        color: quote.verified ? "#16a34a" : "#6b7280",
                        fontSize: 13,
                        marginTop: 5,
                      }}
                    >
                      {quote.verified ? "✓ Verified Supplier" : "Supplier"}
                    </p>
                  </div>

                  <div>
                    <strong>₹{quote.price}</strong>
                    <small style={{ display: "block" }}>per piece</small>
                  </div>

                  <div>
                    ⭐ {quote.rating}
                    <small style={{ display: "block" }}>Rating</small>
                  </div>

                  <div>
                    🚚 {quote.delivery}
                    <small style={{ display: "block" }}>Delivery</small>
                  </div>

                  <button
                    onClick={() => setAcceptedQuote(quote)}
                    style={{
                      background:
                        acceptedQuote?.id === quote.id ? "#16a34a" : "#4f46e5",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: 7,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {acceptedQuote?.id === quote.id ? "Accepted ✓" : "Accept"}
                  </button>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: 15,
                background: "#f9fafb",
                borderRadius: 10,
              }}
            >
              <strong>Smart Comparison:</strong> Compare supplier price,
              rating and delivery time before accepting a quotation.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  zIndex: 2000,
};

const modalStyle = {
  background: "white",
  color: "#111827",
  borderRadius: 16,
  padding: 35,
  width: 520,
  maxWidth: "95%",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
};

const closeStyle = {
  position: "absolute",
  right: 18,
  top: 12,
  background: "none",
  border: "none",
  fontSize: 30,
  cursor: "pointer",
  color: "#6b7280",
};

const inputStyle = {
  boxSizing: "border-box",
  width: "100%",
  padding: 13,
  marginBottom: 15,
  border: "1px solid #d1d5db",
  borderRadius: 8,
  outline: "none",
  fontSize: 14,
};

export default App;
