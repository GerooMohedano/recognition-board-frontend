export default function generateReducer(defaultState, behaviors) {
  return (state = defaultState, action) => {
    const behavior = behaviors[action.type];
    if (behavior) {
      return behavior(state, action);
    }
    return state;
  };
}
