const LOAD = 'pokemon/LOAD';

const load = list => ({
    type: LOAD,
    list,
});

export const getBusinesses = () => async dispatch => {
  const response = await fetch(`/api/pokemon`);

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
        ...allBusinesses,
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
};

export default businessReducer;
