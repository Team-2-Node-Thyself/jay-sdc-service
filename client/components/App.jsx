import React, { useState, useEffect } from 'react';
import SimilarItemsList from './SimilarItemsList.jsx';
import axios from 'axios';
import styled from 'styled-components';

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

  const Wrapper = styled.div`
    width: 70%;
    margin: auto;

    .List::-webkit-scrollbar {
      display: none;
    }

    .List {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  const List = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25%;
    grid-auto-flow: column;
    overflow: auto;
    height: 300px;
  `;

  return (
    <Wrapper>
      <div>Similar Items</div>
      <List className='List'>
        < SimilarItemsList products={products}/>
      </List>
    </Wrapper>
  );
};

export default App;