const initState = {
  notis: []
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEARBY_NOTIFICATIONS':
      console.log("Updating notifications:", action.notis.docs);
      const notis = action.notis.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      return {
        notis: notis
      };
    case 'NEARBY_NOTIFICATIONS_ERROR':
      console.log("Notifications ERROR:", action.err);
    default:
      return state;

  }
}

export default notificationReducer;
