import React, { useState, useEffect } from 'react';
import SimilarItemsList from './SimilarItemsList.jsx';
import axios from 'axios';
import styled from 'styled-components';

const App = (props) => {

  const [products, updateProducts] = useState([]);
  const [pos, updatePos] = useState(0);
  const [scrollAnimation, updateScrollAnimation] = useState(null);

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


  const slide = (direction) => {
    if (direction === 'right') {
      if (pos === 3) {
        updateScrollAnimation('right3');
        updatePos(0);
      } else {
        updateScrollAnimation('right' + pos);
        updatePos(pos + 1);
      }
    } else {
      if (pos === 0) {
        updateScrollAnimation('left0');
        updatePos(3);
      } else {
        updateScrollAnimation('left' + pos);
        updatePos(pos - 1);
      }
    }
  };



  return (
    <Wrapper>
      <span>Similar Items</span>
      <ButtonRight onClick={() => { slide('right'); }}></ButtonRight>
      <ButtonLeft onClick={() => { slide('left'); }}></ButtonLeft>
      <List className='List'>
        < SimilarItemsList products={products} scrollAnimation={scrollAnimation}/>
      </List>
    </Wrapper>
  );
};

export default App;


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
clear: both;
`;

const ButtonRight = styled.div`
  height: 35px;
  width: 35px;
  background-image: url('https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/Screen+Shot+2021-01-18+at+9.23.31+AM.png');
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  position: relative;
  float: right;
  left: -10px;
  `;

const ButtonLeft = styled.div`
  height: 35px;
  width: 35px;
  background-image: url('https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/Screen+Shot+2021-01-18+at+9.23.25+AM.png');
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  position: relative;
  float: right;
  left: -15px;
  `;