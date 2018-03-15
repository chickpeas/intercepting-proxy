import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import NetworkPage, { filterLogTable } from '../../app/containers/NetworkPage';
import { configureStore } from '../../app/store/configureStore';

Enzyme.configure({ adapter: new Adapter() });

function setup(initialState) {
  const store = configureStore(initialState);
  const history = createBrowserHistory();
  const provider = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NetworkPage />
      </ConnectedRouter>
    </Provider>
  );
  const app = mount(provider);
  return {
    app,
    p: app.find('.networkContainer')
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { p } = setup();
      expect(p.length).toEqual(1);
    });
  });

  describe('Helper functions', () => {
    const state = {
      filter: {
        mime: {
          css: true,
          script: true,
          html: true,
          xml: true,
          image: true,
          flash: true,
          binary: true
        },
        statusCode: {
          success: true,
          redirect: true,
          requestErr: true,
          serverErr: true
        }
      },
      network: {
        byId: ['1', '2'],
        byHash: {
          '1': {
            requestId: '3',
            responseId: '4'
          },
          '2': {
            requestId: '5'
          }
        }
      },
      requests: {
        '3': {
          headers: {},
          method: 'get',
          url: 'myurl',
        },
        '5': {
          headers: {},
          method: 'get',
          url: 'myurl',
        }
      },
      responses: {
        '4': {
          'statusCode': 200,
          'mime': 'text/css'
        }
      }
    };

    describe('filterLogTable ', () => {
      it('render all entry if filter are true', () => {
        const tableArray = filterLogTable(state);
        expect(tableArray.length).toEqual(2);
        expect(tableArray[0].statusCode).toEqual(200);
        expect(tableArray[0].mime).toEqual('text/css');
      });
      it('render 1 entry if css filter is false', () => {
        state.filter.mime.css = false;
        const tableArray = filterLogTable(state);
        expect(tableArray.length).toEqual(1);
        expect(tableArray[0].statusCode).toEqual('');
        expect(tableArray[0].mime).toEqual('');
      });
      it('render 1 entry if status filter is false', () => {
        state.filter.statusCode.success = false;
        const tableArray = filterLogTable(state);
        expect(tableArray.length).toEqual(1);
        expect(tableArray[0].statusCode).toEqual('');
        expect(tableArray[0].mime).toEqual('');
      });
    });
  });
});
