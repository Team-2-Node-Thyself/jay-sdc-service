import React from 'react';
import _ from 'lodash';
import SimilarItemsListEntry from './SimilarItemsListEntry.jsx';

const SimilarItemsList = (props) => {
  return (
    _.map(props.products, product => {
      return <li key={product.id}>< SimilarItemsListEntry product={product} /> </li>;
    })
  );
};

export default SimilarItemsList;