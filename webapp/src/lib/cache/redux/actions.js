export const CACHE_QUERY_START = 'CACHE_QUERY_START';
export const CACHE_QUERY_STARTED = 'CACHE_QUERY_STARTED';
export const CACHE_QUERY_ERROR = 'CACHE_QUERY_ERROR';
export const CACHE_QUERY_SUCCESS = 'CACHE_QUERY_SUCCESS';

export const CACHE_UPDATE = 'CACHE_UPDATE';
export const CACHE_INVALIDATE_QUERY = 'CACHE_INVALIDATE_QUERY';

export const CACHE_REDUCER_ACTION = 'CACHE_REDUCER_ACTION';

export const cacheStartQuery = ({ key, params }) => ({
  type: CACHE_QUERY_START,
  key,
  params,
});
export const cacheQueryStarted = ({ queryId, key, params }) => ({
  type: CACHE_QUERY_STARTED,
  queryId,
  key,
  params,
});
export const cacheQuerySuccess = ({ key, params, result }) => ({
  type: CACHE_QUERY_SUCCESS,
  key,
  params,
  result,
});
export const cacheQueryError = ({ key, params, error }) => ({
  type: CACHE_QUERY_ERROR,
  key,
  params,
  error,
});

export const cacheUpdate = (ops) => ({
  type: CACHE_UPDATE,
  ops,
});
export const cacheInvalidateQuery = ({ key, params }) => ({
  type: CACHE_INVALIDATE_QUERY,
  key,
  params,
});

export const cacheReducerAction = (actionType, payload) => ({
  type: CACHE_REDUCER_ACTION,
  actionType,
  payload,
});

export const QUERIES = {
  templates: () => 'templates',
  template: () => 'template',
};
