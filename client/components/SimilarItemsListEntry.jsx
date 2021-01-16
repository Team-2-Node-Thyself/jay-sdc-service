import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SimilarItemsListEntry = (props) => {

  const Entry = styled.div`
  height: 80%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-family: Helvetica;
  font-weight: 100;
  `;

  const ProductImg = styled.div`
  background-image: url(${props.product.imageUrl});
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

  const StarDiv = styled.div`
  background-image: url('https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/Screen+Shot+2021-01-15+at+2.35.47+PM.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-bottom: 10px;
  `;

  const ReviewDiv = styled.div`
  font-size: 12px;
  display: inline;
  position: relative;
  bottom: 12px;
  `;

  const HeartImage = styled.div`
  width: 30px;
  height: 30px;
  float: right;
  background-image: url('https://smallimg.pngkey.com/png/small/377-3778885_jewelry-icon-heart-black-love-emblem-small-heart.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  `;


  const displayRating = () => {
    if (props.product.rating) {
      return (
        <ReviewDiv>
          <span> {props.product.rating}</span>
          <span> ({props.product.reviewCount})</span>
        </ReviewDiv>
      );
    } else {
      return (
        <ReviewDiv> No Reviews Yet</ReviewDiv>
      );
    }
  };

  return (
    <Entry>
      <ProductImg><HeartImage></HeartImage></ProductImg>
      <StarDiv></StarDiv>
      {displayRating()}
      <div>{props.product.name}</div>
      <div><b>${props.product.price}</b></div>
    </Entry>
  );
};

export default SimilarItemsListEntry;