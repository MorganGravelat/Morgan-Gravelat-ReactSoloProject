const LOAD = "businesses/LOAD";
const ADD_ONE = "business/ADD_ONE";

const load = (list) => ({
  type: LOAD,
  list,
});

const addOne = (business) => ({
  type: ADD_ONE,
  business,
});

export const getBusinesses = () => async (dispatch) => {
  const response = await fetch(`/api/business`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};

export const createBusiness = (business) => async (dispatch) => {
  const response = await fetch(`/api/business/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  });
  if (response.ok) {
    const business = await response.json();
    dispatch(addOne(business));
    return business;
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
      action.list.forEach((business) => {
        allBusinesses[business.id] = business;
      });

      return {
        ...state,
        list: action.list,
      };
    case ADD_ONE:
      const newBusiness = action.business;
      return {
        ...state,
        business: {
          ...state.business,
          newBusiness,
        },
      };
    default:
      return state;
  }
};

export default businessReducer;
