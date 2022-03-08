const LOAD = 'businesses/LOAD';

const load = list => ({
    type: LOAD,
    list,
});

export const getBusinesses = () => async dispatch => {
  const response = await fetch(`/api/business`);
    console.log(response)
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

const initialState = {
  list: [],
  types: [],
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allBusinesses = {};
      action.list.forEach(business => {
        allBusinesses[business.id] = business;
      });

      return {
          ...state,
          allBusinesses,
        list: action.list,
      };
    default:
      return state;
  }
};

export default businessReducer;
