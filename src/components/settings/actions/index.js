
export const ActionTypes = {
  updateNotifNumber: 'updateNotifNumber',
};

export function updateNotifNumber(notifNumber) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.updateNotifNumber, payload: notifNumber});
    // console.log('dispatched an updatenotifnum action');
  };
}