const initState = {
  notis: []
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEARBY_NOTIFICATIONS':
      const notis = action.notis.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      return {
        notis: notis
      };
    case 'NEARBY_NOTIFICATIONS_ERROR':
      console.log("Notifications ERROR:", action.err);
      return state;
    case 'NO_NEARBY_NOTIFICATIONS':
      return initState
    default:
      return state;

  }
}

export default notificationReducer;
