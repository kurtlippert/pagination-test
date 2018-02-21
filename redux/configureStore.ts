import { loadState, saveState } from '@libs/localStorage'
import { State } from '@main/model'
import { throttle } from 'lodash'
import { createStore, GenericStoreEnhancer, Reducer } from 'redux'

const configureStore = (update: Reducer<State>, middlewares?: GenericStoreEnhancer) => {
  const preloadedState: State | undefined = loadState()
  const store =
    createStore<State>(
      update,
      preloadedState || [],
      middlewares,
    )

  store.subscribe(
    throttle(
      () => saveState(store.getState()),
      1000,
    ),
  )

  return store
}

export default configureStore
