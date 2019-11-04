// The reduces is just a fucntion.
// Thes fucntion simply take the old state and the incoming action
// and the we return a new modified state

export interface State { // this is only the interface for initialState
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

// I set state - initial state for the first time execution
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADIGN' :
      return {
        isLoading: true
      };

    case 'STOP_LOADING':
      return {
        isLoading: false
      };

    default:
      return state;
  }
}