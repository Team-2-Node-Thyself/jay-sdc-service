import React from 'react';
import _ from 'lodash';
import SimilarItemsListEntry from './SimilarItemsListEntry.jsx';

const SimilarItemsList = (props) => {
  return (
    _.map(props.products, product => {
      return < SimilarItemsListEntry key={product.id} product={product} scrollAnimation={props.scrollAnimation}/>;
    })
  );
};

export default SimilarItemsList;