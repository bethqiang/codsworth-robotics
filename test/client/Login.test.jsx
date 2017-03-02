import React from 'react';
import chai, { expect } from 'chai';
chai.use(require('chai-enzyme')());
import { shallow } from 'enzyme';
// import { spy } from 'sinon';
chai.use(require('sinon-chai'));

import { Login } from 'APP/app/components/Login';

describe('<Login />', () => {
  let root;
  beforeEach('render the root', () =>
    root = shallow(<Login/>)
  );

  it('renders without exploding', () => {
    expect(root).to.have.length(1);
  });

  it('shows a login form', () => {
    expect(root.find('input[name="email"]')).to.have.length(1);
    expect(root.find('input[name="password"]')).to.have.length(1);
  });

  it('shows a password field', () => {
    const pw = root.find('input[name="password"]');
    expect(pw).to.have.length(1);
    expect(pw.at(0)).to.have.attr('type').equals('password');
  });

  it('has a login button', () => {
    const submit = root.find('button[type="submit"]');
    expect(submit).to.have.length(1);
  });
});
