import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ActionBar from '../../app/components/ui/ActionBar';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    filter: {},
    pendingRequest: {}
  };

  const component = shallow(<ActionBar {...props} />);
  return {
    component,
    props
  };
}

describe('ActionBar component', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});
