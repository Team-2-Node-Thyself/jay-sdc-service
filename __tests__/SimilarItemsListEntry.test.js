import React from 'react';
import { shallow, render, mount } from 'enzyme';
import SimilarItemsListEntry from '../client/components/SimilarItemsListEntry.jsx';

const dummyProduct = {
  name: 'Wand Tassels The Mouse Cat Toy',
  description: 'stick to wave in front of your cat',
  imageUrl: 'https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/Screen+Shot+2021-01-13+at+2.23.14+PM.png',
  category: 3,
  isFavorite: 1,
  price: '3.99',
  cutPrice: null,
  rating: '4.5',
  reviewCount: 30
};


test('price should exist and display properly', () => {
  const wrapper = mount(<SimilarItemsListEntry product={dummyProduct}/>);
  expect(wrapper.find('b').text()).toBe('$3.99');
  wrapper.unmount();
});

test('heart image should display properly', () => {
  const wrapper = mount(<SimilarItemsListEntry product={dummyProduct}/>);

  expect(wrapper.find('HeartImage').prop('favoriteImg')).toBe('https://carousel-media.s3.us-east-2.amazonaws.com/carousel-media/yikrLMzET.png');

});