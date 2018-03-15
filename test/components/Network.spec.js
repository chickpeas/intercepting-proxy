import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer';
// import { BrowserRouter as Router } from 'react-router-dom';

// import { configureStore } from '../../app/store/configureStore';
import Network from '../../app/components/Network';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const initialState = {
    network: {
      byId: [],
      byHash: []
    },
    requests: {},
    responses: {}
  };
  const props = {
    changeGlobalFilter: spy(),
    onRowClick: spy(),
    log: [
      {
        index: 0,
        id: '123',
        requestId: '456',
        url: 'asd.com',
        methord: 'get',
        statusCode: 200
      }
    ],
  };
  const component = shallow(<Network {...props} />);
  return {
    component,
    props
  };
}

describe('Network component', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  // it('should first button should call increment', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(0).simulate('click');
  //   expect(actions.increment.called).toBe(true);
  // });

  // it('should match exact snapshot', () => {
  //   const { props } = setup();
  //   const network = (
  //     <div>
  //       <Router>
  //         <Network {...props} />
  //       </Router>
  //     </div>
  //   );
  //   const tree = renderer
  //     .create(network)
  //     .toJSON();
  //
  //   expect(tree).toMatchSnapshot();
  // });

  // it('should second button should call decrement', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(1).simulate('click');
  //   expect(actions.decrement.called).toBe(true);
  // });

  // it('should third button should call incrementIfOdd', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(2).simulate('click');
  //   expect(actions.incrementIfOdd.called).toBe(true);
  // });

  // it('should fourth button should call incrementAsync', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(3).simulate('click');
  //   expect(actions.incrementAsync.called).toBe(true);
  // });
});
