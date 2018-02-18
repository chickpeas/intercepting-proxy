import network from '../../app/reducers/network';
import { ADD_REQUEST, ADD_RESPONSE } from '../../app/actions/network';

describe('reducers', () => {
  describe('network', () => {
    it('should handle initial state', () => {
      expect(network(undefined, {})).toMatchSnapshot();
    });

    it('should handle ADD_RESPONSE', () => {
      expect(network({ byId: [], byHash: {} }, { type: ADD_RESPONSE, payload: {} })).toMatchSnapshot();
    });

    it('should handle ADD_REQUEST', () => {
      expect(network({ byId: [], byHash: {} }, { type: ADD_REQUEST, payload: {} })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(network({ byId: [], byHash: {} }, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
