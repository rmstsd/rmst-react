import { ActionTypes } from './actions'
import { parseActions, isHistory, newHistory } from './helpers'

// createHistory
function createHistory(state, ignoreInitialState) {
  // ignoreInitialState essentially prevents the user from undoing to the
  // beginning, in the case that the undoable reducer handles initialization
  // in a way that can't be redone simply
  const history = newHistory([], state, [])
  if (ignoreInitialState) {
    history._latestUnfiltered = null
  }
  return history
}

// insert: insert `state` into history, which means adding the current state
//         into `past`, setting the new `state` as `present` and erasing
//         the `future`.
function insert(history, state, limit, group) {
  const lengthWithoutFuture = history.past.length + 1

  const { past, _latestUnfiltered } = history
  const isHistoryOverflow = limit && limit <= lengthWithoutFuture

  const pastSliced = past.slice(isHistoryOverflow ? 1 : 0)
  const newPast = _latestUnfiltered != null ? [...pastSliced, _latestUnfiltered] : pastSliced

  return newHistory(newPast, state, [], group)
}

// jumpToFuture: jump to requested index in future history
function jumpToFuture(history, index) {
  if (index < 0 || index >= history.future.length) return history

  const { past, future, _latestUnfiltered } = history

  const newPast = [...past, _latestUnfiltered, ...future.slice(0, index)]
  const newPresent = future[index]
  const newFuture = future.slice(index + 1)

  return newHistory(newPast, newPresent, newFuture)
}

// jumpToPast: jump to requested index in past history
function jumpToPast(history, index) {
  if (index < 0 || index >= history.past.length) return history

  const { past, future, _latestUnfiltered } = history

  const newPast = past.slice(0, index)
  const newFuture = [...past.slice(index + 1), _latestUnfiltered, ...future]
  const newPresent = past[index]

  return newHistory(newPast, newPresent, newFuture)
}

// jump: jump n steps in the past or forward
function jump(history, n) {
  if (n > 0) return jumpToFuture(history, n - 1)
  if (n < 0) return jumpToPast(history, history.past.length + n)
  return history
}

// helper to dynamically match in the reducer's switch-case
function actionTypeAmongClearHistoryType(actionType, clearHistoryType) {
  return clearHistoryType.indexOf(actionType) > -1 ? actionType : !actionType
}

// redux-undo higher order reducer
export default function undoable(reducer, rawConfig = {}) {
  const config = {
    limit: undefined,
    filter: () => true,
    groupBy: () => null,
    undoType: ActionTypes.UNDO,
    redoType: ActionTypes.REDO,
    jumpToPastType: ActionTypes.JUMP_TO_PAST,
    jumpToFutureType: ActionTypes.JUMP_TO_FUTURE,
    jumpType: ActionTypes.JUMP,
    neverSkipReducer: false,
    ignoreInitialState: false,
    syncFilter: false,

    ...rawConfig,

    initTypes: parseActions(rawConfig.initTypes, ['@@redux-undo/INIT']),
    clearHistoryType: parseActions(rawConfig.clearHistoryType, [ActionTypes.CLEAR_HISTORY])
  }

  // Allows the user to call the reducer with redux-undo specific actions
  const skipReducer = config.neverSkipReducer
    ? (res, action, ...slices) => ({
        ...res,
        present: reducer(res.present, action, ...slices)
      })
    : res => res

  let initialState

  return (state = initialState, action = {}, ...slices) => {
    let history = state
    if (!initialState) {
      if (state === undefined) {
        const createHistoryAction = { type: '@@redux-undo/CREATE_HISTORY' }
        const start = reducer(state, createHistoryAction, ...slices)

        history = createHistory(start, config.ignoreInitialState)

        return history
      } else if (isHistory(state)) {
        console.log(2)
        history = initialState = config.ignoreInitialState ? state : newHistory(state.past, state.present, state.future)
      } else {
        console.log(3)
        history = initialState = createHistory(state, config.ignoreInitialState)
      }
    }

    let res
    switch (action.type) {
      case undefined:
        return history

      case config.undoType:
        res = jump(history, -1)

        return res
      case config.redoType:
        res = jump(history, 1)
        return res

      default:
        res = reducer(history.present, action, ...slices)

        history = insert(history, res, config.limit, null)

        return history
    }
  }
}