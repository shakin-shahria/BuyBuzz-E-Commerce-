import { useState, useEffect } from "react";
import axios from "axios";
import AppURL from "../../../api/AppURL";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [products, setProducts] = useState([]); // State for storing products
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors
  const [showResults, setShowResults] = useState(false); // State to control visibility of results

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Use useEffect to make an API call whenever the searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setProducts([]); // Clear products when the search query is empty
      setShowResults(false); // Hide the results when the query is empty
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(AppURL.ProductSearch, {
        params: { query: searchQuery }, // Send the query to the API
      })
      .then((response) => {
        setProducts(response.data); // Set the products received from the API
        setShowResults(true); // Show results after search
      })
      .catch((error) => {
        setError("Failed to fetch products"); // Handle error
        setShowResults(false); // Hide results if there is an error
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Stop loading indicator
      });
  }, [searchQuery]); // Run this effect when searchQuery changes

  return (
    <div className="col-lg-6 col-6 text-left">
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <span className="input-group-text bg-transparent text-primary">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Conditionally render the search results */}
      <div 
        className="search-results"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          fontSize: '14px',
          border: '1px solid rgb(205, 196, 196)',
          borderRadius: '5px',
          position: 'absolute',
          zIndex: 11,
          width: '100%',
          opacity: 0.9,
          color: '#c53d31',
          display: showResults ? 'block' : 'none' // Conditional display
        }}
      >
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.product_id}>
                <h5>{product.product_title}</h5>
                {/* <p>{product.short_description}</p> */}
                <p>Price: ${product.product_price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
