import React, { useState, useEffect } from 'react';
import SimilarItemsList from './SimilarItemsList.jsx';
import axios from 'axios';
import styled from 'styled-components';

const App = (props) => {

  const [products, updateProducts] = useState([]);
  const [pos, updatePos] = useState(0);
  const [scrollAnimation, updateScrollAnimation] = useState(null);

  useEffect(() => {
    let x = window.location.pathname;
    let productId = x.slice(10, -1);

    if (productId < 1 || productId.length < 1) {
      productId = 1;
    }

    axios.get(`http://localhost:8001/products/similar/${productId}`)
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

  const displayPageNum = () => {
    return (
      <PageNum>{pos + 1}/4</PageNum>
    );
  };


  return (
    <Wrapper>
      <Title>Similar Items</Title>
      <ButtonRight className='buttons' onClick={() => { slide('right'); }}></ButtonRight>
      <ButtonLeft className='buttons' onClick={() => { slide('left'); }}></ButtonLeft>
      {displayPageNum()}
      <List className='List'>
        <div></div>
        < SimilarItemsList products={products} scrollAnimation={scrollAnimation}/>
        <div></div>
      </List>
    </Wrapper>
  );
};

export default App;


const Wrapper = styled.div`
width: 1200px;
margin: auto;

.List::-webkit-scrollbar {
  display: none;
}

.List {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.buttons {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  box-shadow: 0px 0px 2px #544d4d;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  position: relative;
  float: right;
}

@media only screen and (max-width: 1300px) {
  width: 94%;
}
`;

Wrapper.displayName = 'Wrapper';

const List = styled.div`
display: grid;
grid-template-columns: 2px 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 25% 2px;
grid-auto-flow: column;
overflow: auto;
height: 300px;
clear: both;

`;

List.displayName = 'List';

const ButtonRight = styled.div`
  background-image: url('https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/kisspng-arrow-computer-icons-button-right-arrow-5ad612c55b31d7.4599895915239789493735.png');
  left: -10px;
  `;

ButtonRight.displayName = 'ButtonRight';

const ButtonLeft = styled.div`
  background-image: url('https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/pngegg.png');
  left: -15px;
  `;

ButtonLeft.displayName = 'ButtonLeft';

const Title = styled.span`
  font-size: 25px;
  font-family: Helvetica;
  position: relative;
  left: 1%;
`;

Title.displayName = 'Title';

const PageNum = styled.span`
  position: relative;
  float: right;
  left: -30px;
  top: 7px;
`;

PageNum.displayName = 'PageNum';