const initState = {
  deals: []
}

const dealReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DEAL':
      console.log('created deal', action.deal)
      return state;
    case 'CREATE_DEAL_ERROR':
      console.log('create deal error', action.err);
      return state;
    case 'NEARBY_DEALS':
      console.log('nearby deals returned:', action.deals.docs);
      const deals = action.deals.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      return {
        deals: deals
      };
    default:
      return state;
  }
}

export default dealReducer;
