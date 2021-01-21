import React from 'react';
import { shallow, render, mount } from 'enzyme';
import App from '../client/components/App.jsx';


test('testing mounted methods', () => {
  expect(2 + 2).toEqual(4);
  const wrapper = mount(<App included={'a prop'}/>);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('Wrapper')).toBeDefined();
  expect(wrapper.props().included).toEqual('a prop');
  expect(wrapper.find('PageNum').text()).toBe('1/4');
  wrapper.find('ButtonRight').simulate('click');
  expect(wrapper.find('PageNum').text()).toBe('2/4');
  wrapper.find('ButtonLeft').simulate('click');
  expect(wrapper.find('PageNum').text()).toBe('1/4');
  wrapper.unmount();
});
