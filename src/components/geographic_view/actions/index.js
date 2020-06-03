// keys for actiontypes
export const ActionTypes = {
  changeFilters: 'changeFilters',
};


// so these actions + the current state are all the reducer should need to get the next state

// changeFilters
export function changeFilters(newFilters) {
  console.log('We are in the action creator for changeFilters, producing a changeFilters action!');
  return (dispatch) => {
    dispatch({ type: ActionTypes.changeFilters, payload: newFilters }); 
  };
}
