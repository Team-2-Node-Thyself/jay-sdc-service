import React, { useState, useEffect } from 'react';
import SimilarItemsList from './SimilarItemsList.jsx';
import axios from 'axios';

const App = (props) => {

  const [products, updateProducts] = useState([]);

  useEffect(() => {
    let categoryId = 3;

    axios.get(`/products/similar/${categoryId}`)
      .then(results => {
        updateProducts(results.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return (
    <div>
      <div>Similar Items</div>
      <div>
        < SimilarItemsList products={products}/>
      </div>
    </div>
  );
};

export default App;