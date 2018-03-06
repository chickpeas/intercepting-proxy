// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

import * as actions from '../../app/actions/network';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);


describe('actions', () => {
  it('should addRequest should create action', () => {
    expect(actions.addRequest('123', { method: 'GET', url: 'myurl', headers: {} })).toEqual({
      payload: {
        requestId: expect.any(String),
        id: '123',
        headers: {},
        method: 'GET',
        url: 'myurl',
        body: {}
      },
      type: actions.ADD_REQUEST
    });
  });

  it('should addResponse should create action', () => {
    expect(actions.addResponse('123', { statusCode: 200, headers: {} })).toEqual({
      payload: {
        id: '123',
        responseId: expect.any(String),
        statusCode: expect.any(Number)
      },
      type: actions.ADD_RESPONSE
    });
  });

  it('should addPendingRequest should create 2 actions', () => {
    const fn = actions.addPendingRequest(
      '123',
      {
        requestId: '123',
        headers: {},
        method: 'GET',
        url: 'myurl'
      }
    );
    expect(typeof fn).toBe('function');
    const dispatch = jest.fn();
    const getState = () => ({});
    fn(dispatch, getState);
    // console.log(dispatch.mock.calls);
    expect(dispatch.mock.calls).toEqual([[
      {
        payload: {
          requestId: expect.any(String),
          id: '123',
          headers: {},
          method: 'GET',
          url: 'myurl',
          body: {}
        },
        type: actions.ADD_REQUEST
      }], [{
      type: actions.ADD_PENDING_REQUEST,
      payload: {
        id: expect.any(String)
      }
    }]]);
    // expect(dispatch.mock.calledWith({
    //   type: actions.ADD_PENDING_REQUEST
    // })).toBe(true);
  });

  // it('should addResponse should create action', () => {
  //   const fn = actions.addResponse('123', { responseId: '456', status: 200 });
  //   expect(fn).toBeInstanceOf(Function);
  //   const dispatch = spy();
  //   const getState = () => ({});
  //   fn(dispatch, getState);
  //   expect(dispatch.calledWith({ type: actions.ADD_RESPONSE })).toBe(true);
  // });
  //
  // it('should addRequest shouldnt create action', () => {
  //   const fn = actions.addRequest('123', { requestId: '456', method: 200, url: 'url' });
  //   const dispatch = spy();
  //   const getState = () => ({});
  //   fn(dispatch, getState);
  //   expect(dispatch.called).toBe(false);
  // });
});
