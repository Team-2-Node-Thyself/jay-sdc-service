import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const SimilarItemsListEntry = (props) => {

  const [isFavorite, updateIsFavorite] = useState(false);
  const isFavImg = 'https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/yikrLMzET.png';
  const isNotFavImg = 'https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/Heart-PNG-HD.png';
  let favoriteImg;

  if (isFavorite) {
    favoriteImg = isFavImg;
  } else {
    favoriteImg = isNotFavImg;
  }

  useEffect(() => {
    if (props.product.isFavorite) {
      updateIsFavorite(true);
    }
  }, []);

  const handleFavorite = () => {

    if (isFavorite) {

      axios.patch(`/products/favorites/remove/${props.product.id}`)
        .then(() => {
          updateIsFavorite(!isFavorite);
          favoriteImg = isNotFavImg;
        })
        .catch(err => {
          console.log(err);
        });
    } else {

      axios.patch(`/products/favorites/add/${props.product.id}`)
        .then(() => {
          updateIsFavorite(!isFavorite);
          favoriteImg = isFavImg;
        })
        .catch(err => {
          console.log(err);
        });
    }

  };

  const displayRating = () => {
    if (props.product.rating) {
      return (
        <ReviewDiv>
          <span> {props.product.rating}</span>
          <span className='count'> ({props.product.reviewCount})</span>
        </ReviewDiv>
      );
    } else {
      return (
        <ReviewDiv> No Reviews Yet</ReviewDiv>
      );
    }
  };

  const displayPrice = () => {
    if (props.product.cutPrice) {
      return (
        <div>
          <CutPrice>${props.product.price}</CutPrice>
          <span><b>${props.product.cutPrice}</b></span>
        </div>

      );
    } else {
      return (
        <div><b>${props.product.price}</b></div>
      );
    }
  };

  return (
    <EntryDiv scrollAnimation={props.scrollAnimation}>
      <ProductImg imageUrl={props.product.imageUrl}><HeartImage onClick={handleFavorite} favoriteImg={favoriteImg}></HeartImage></ProductImg>
      <StarDiv></StarDiv>
      {displayRating()}
      <div>{props.product.name}</div>
      {displayPrice()}
    </EntryDiv>
  );
};

export default SimilarItemsListEntry;



const StarDiv = styled.div`
background-image: url('https://pngimg.com/uploads/red_star/red_star_PNG31.png');
background-repeat: no-repeat;
background-position: center;
background-size: 15px 15px;
width: 15px;
height: 15px;
display: inline-block;
margin-bottom: 10px;
`;

StarDiv.displayName = 'StarDiv';

const ReviewDiv = styled.div`
font-size: 12px;
display: inline;
position: relative;
bottom: 12px;

.count {
  color: grey;
}
`;

ReviewDiv.displayName = 'ReviewDiv';

const HeartImage = styled.div`
width: 21px;
height: 21px;
float: right;
position: relative;
right: 10px;
top: 10px;
background-image: url('${props => props.favoriteImg}');
background-repeat: no-repeat;
background-position: center;
background-size: 100% 100%;
`;

HeartImage.displayName = 'HeartImage';

const ProductImg = styled.div`
background-image: url('${props => props.imageUrl}');
background-repeat: no-repeat;
background-position: center;
box-shadow: 0px 0px 0px 1px rgba(0,0,0,.03);
border-radius: 15px;
border-size: 5px;
margin-top: 10px;
margin-bottom: 10px;
height: 80%;
background-size: 100% 100%;
`;

ProductImg.displayName = 'ProductImg';

const EntryDiv = styled.div`

  @keyframes right0 {
    from {left: 0%;}
    to {left: -400%;}
  }

  @keyframes right1 {
    from {left: -400%;}
    to {left: -800%;}
  }

  @keyframes right2 {
    from {left: -800%;}
    to {left: -1200%;}
  }

  @keyframes right3 {
    from {left: -1200%;}
    to {left: 0%;}
  }

  @keyframes left0 {
    from {left: 0%;}
    to {left: -1200%;}
  }

  @keyframes left1 {
    from {left: -400%;}
    to {left: 0%;}
  }

  @keyframes left2 {
    from {left: -800%;}
    to {left: -400%;}
  }

  @keyframes left3 {
    from {left: -1200%;}
    to {left: -800%;}
  }

  height: 80%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-family: Helvetica;
  font-weight: 100;
  position: relative;
  animation: ${props => props.scrollAnimation} 1s 1 forwards;
  `;

EntryDiv.displayName = 'EntryDiv';

const CutPrice = styled.span`
  text-decoration: line-through;
  margin-right: 10px;
`;

CutPrice.displayName = 'CutPrice';