import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { InfoPanel } from '../../app/components/ui/InfoPanel';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    request: {
      headers: 'value'
    },
    response: {
      body: 'value'
    }
  };

  const component = shallow(<InfoPanel {...props} />);
  return {
    component,
    props
  };
}

describe('InfoPanel component', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});
