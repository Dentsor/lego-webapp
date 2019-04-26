import { createSelector } from 'reselect';
import { Penalty } from '../actions/ActionTypes';
import createEntityReducer from 'app/utils/createEntityReducer';

export default createEntityReducer({
  key: 'penalties',
  types: {
    fetch: Penalty.FETCH,
    mutate: Penalty.CREATE
  },
  mutate(state, action) {
    switch (action.type) {
      case Penalty.DELETE.SUCCESS:
        return {
          ...state,
          items: state.items.filter(id => action.meta.penaltyId !== id)
        };
      default:
        return state;
    }
  }
});

export const selectPenalties = createSelector(
  state => state.penalties.byId,
  state => state.penalties.items,
  (penaltiesById, penaltyIds) => penaltyIds.map(id => penaltiesById[id])
);

export const selectPenaltyByUserId = createSelector(
  selectPenalties,
  (state, props) => props.userId,
  (penaltiesById, userId) =>
    penaltiesById.filter(penalty => penalty.user === userId)
);
