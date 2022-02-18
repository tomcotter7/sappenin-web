const initState = {
  notis: [],
  notisFound: false
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEARBY_NOTIFICATIONS':
      const notis = action.notis.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      return {
        notis: notis,
        notisFound: true
      };
    case 'NEARBY_NOTIFICATIONS_ERROR':
      console.log("Notifications ERROR:", action.err);
      return state;
    case 'NO_NEARBY_NOTIFICATIONS':
      return {
        notis: [],
        notisFound : true
      }
    default:
      return state;

  }
}

export default notificationReducer;
