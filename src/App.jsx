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
  {
    id: 1,
    supplier: "CottonCraft Industries",
    rating: "4.8",
    price: 245,
    delivery: "7 Days",
    quantity: "500 Pieces",
    verified: true,
  },
  {
    id: 2,
    supplier: "TextileHub India",
    rating: "4.6",
    price: 270,
    delivery: "5 Days",
    quantity: "500 Pieces",
    verified: true,
  },
  {
    id: 3,
    supplier: "FashionBulk Suppliers",
    rating: "4.5",
    price: 255,
    delivery: "10 Days",
    quantity: "500 Pieces",
    verified: false,
  },
];

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showRequirement, setShowRequirement] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [acceptedQuote, setAcceptedQuote] = useState(null);
  const [requirement, setRequirement] = useState({
    product: "",
    quantity: "",
    budget: "",
    description: "",
  });

  const categories = [
    "All",
    "Office",
    "Electronics",
    "Packaging",
    "Accessories",
  ];

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || product.category === category;

    return searchMatch && categoryMatch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
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
            top: "20px",
            left: "20px",
            zIndex: 1000,
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
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

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="nav-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button className="nav-btn">
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

            <button
              className="primary-btn"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
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
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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
          padding: "35px",
          borderRadius: "18px",
          background: "#eef2ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "8px" }}>
            Can't find what you need?
          </h2>

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
          ].map(([name, icon, text]) => (

            <div
              className="category-card"
              key={name}
              onClick={() => {
                setCategory(name);
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="category-icon">{icon}</div>
              <h3>{name}</h3>
              <p>{text}</p>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {categories.map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "1px solid #4f46e5",
                cursor: "pointer",
                background:
                  category === item ? "#4f46e5" : "white",
                color:
                  category === item ? "white" : "#4f46e5",
                fontWeight: "600",
              }}
            >
              {item}
            </button>

          ))}
        </div>

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <div className="product-card" key={product.id}>

              <div className="product-image">
                {product.icon}
              </div>

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
                    marginTop: "15px",
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
                      borderRadius: "7px",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>

              </div>
            </div>

          ))}

        </div>
      </section>

      {/* QUOTATION SECTION */}
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
          Connect with verified suppliers and get competitive
          quotations.
        </p>

        <button onClick={() => setShowRequirement(true)}>
          Post Your Requirement
        </button>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Bizora. Smart B2B Marketplace.</p>
      </footer>

      {/* REQUIREMENT MODAL */}
      {showRequirement && (

        <div style={overlayStyle}>

          <div style={modalStyle}>

            <button
              onClick={() => setShowRequirement(false)}
              style={closeStyle}
            >
              ×
            </button>

            <h2>Post Your Requirement</h2>

            <p style={{ color: "#6b7280", marginBottom: "25px" }}>
              Tell suppliers exactly what your business needs.
            </p>

            <form onSubmit={submitRequirement}>

              <input
                style={inputStyle}
                placeholder="Product / Service Name"
                value={requirement.product}
                onChange={(e) =>
                  setRequirement({
                    ...requirement,
                    product: e.target.value,
                  })
                }
                required
              />

              <input
                style={inputStyle}
                placeholder="Required Quantity"
                value={requirement.quantity}
                onChange={(e) =>
                  setRequirement({
                    ...requirement,
                    quantity: e.target.value,
                  })
                }
                required
              />

              <input
                style={inputStyle}
                placeholder="Budget per unit (₹)"
                value={requirement.budget}
                onChange={(e) =>
                  setRequirement({
                    ...requirement,
                    budget: e.target.value,
                  })
                }
                required
              />

              <textarea
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "vertical",
                }}
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

        <div style={overlayStyle}>

          <div
            style={{
              ...modalStyle,
              width: "850px",
              maxWidth: "95%",
            }}
          >

            <button
              onClick={() => setShowQuotes(false)}
              style={closeStyle}
            >
              ×
            </button>

            <h2>Supplier Quotations</h2>

            <p style={{ color: "#6b7280" }}>
              Requirement: {requirement.product || "Cotton T-Shirts"}{" "}
              | Quantity: {requirement.quantity || "500 Pieces"}
            </p>

            <div
              style={{
                marginTop: "25px",
                display: "grid",
                gap: "15px",
              }}
            >

              {quotations.map((quote) => (

                <div
                  key={quote.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns:
                      "2fr 1fr 1fr 1fr auto",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >

                  <div>
                    <h3>{quote.supplier}</h3>

                    <p
                      style={{
                        color: quote.verified
                          ? "#16a34a"
                          : "#6b7280",
                        fontSize: "13px",
                        marginTop: "5px",
                      }}
                    >
                      {quote.verified
                        ? "✓ Verified Supplier"
                        : "Supplier"}
                    </p>
                  </div>

                  <div>
                    <strong>₹{quote.price}</strong>
                    <small style={{ display: "block" }}>
                      per piece
                    </small>
                  </div>

                  <div>
                    ⭐ {quote.rating}
                    <small style={{ display: "block" }}>
                      Rating
                    </small>
                  </div>

                  <div>
                    🚚 {quote.delivery}
                    <small style={{ display: "block" }}>
                      Delivery
                    </small>
                  </div>

                  <button
                    onClick={() => setAcceptedQuote(quote)}
                    style={{
                      background:
                        acceptedQuote?.id === quote.id
                          ? "#16a34a"
                          : "#4f46e5",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "7px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {acceptedQuote?.id === quote.id
                      ? "Accepted ✓"
                      : "Accept"}
                  </button>

                </div>

              ))}

            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                background: "#f9fafb",
                borderRadius: "10px",
              }}
            >
              <strong>Smart Comparison:</strong> Compare supplier
              price, rating and delivery time before accepting a
              quotation.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* MODAL STYLES */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  zIndex: 2000,
};

const modalStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "35px",
  width: "520px",
  maxWidth: "95%",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
};

const closeStyle = {
  position: "absolute",
  right: "18px",
  top: "12px",
  background: "none",
  border: "none",
  fontSize: "30px",
  cursor: "pointer",
  color: "#6b7280",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
};

export default App;