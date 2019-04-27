
import callAPI from 'app/actions/callAPI';
import { Tag } from './ActionTypes';
import { Thunk } from 'app/types';
import { tagSchema } from 'app/reducers';

export function fetch(id: string): Thunk<*> {
  return callAPI({
    types: Tag.FETCH,
    endpoint: `/tags/${id}/`,
    schema: tagSchema,
    meta: {
      errorMessage: 'Henting av tag feilet'
    },
    propagateError: true
  });
}

export function fetchPopular(): Thunk<*> {
  return callAPI({
    types: Tag.POPULAR,
    endpoint: `/tags/popular/`,
    meta: {
      errorMessage: 'Henting av populære tags feilet'
    },
    propagateError: false
  });
}

export function fetchAll({ next = false }: { next: boolean } = {}): Thunk<*> {
  return (dispatch, getState) => {
    const cursor = next ? getState().tags.pagination.next : {};
    return dispatch(
      callAPI({
        types: Tag.FETCH,
        endpoint: '/tags/',
        schema: [tagSchema],
        query: {
          ...cursor
        },
        meta: {
          errorMessage: 'Henting av tags feilet'
        },
        propagateError: true
      })
    );
  };
}
