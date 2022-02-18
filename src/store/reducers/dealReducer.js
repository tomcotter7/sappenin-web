const initState = {
  deals: [],
  dealsFound: false
}

const dealReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DEAL':
      return state;
    case 'CREATE_DEAL_ERROR':
      return state;
    case 'NEARBY_DEALS':
      const deals = action.deals.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return {
        deals: deals,
        dealsFound: true
      };
    case 'NO_NEARBY_DEALS':
      return {
        deals: [],
        dealsFound: false
      }
    default:
      return state;
  }
}

export default dealReducer;
