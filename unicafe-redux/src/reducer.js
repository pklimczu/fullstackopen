const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const newState = { ...state }
  switch (action.type) {
    case 'GOOD':
      newState.good += 1
      break
    case 'OK':
      newState.ok += 1
      break
    case 'BAD':
      newState.bad += 1
      break
    case 'ZERO':
      newState.good = 0
      newState.ok = 0
      newState.bad = 0
      break
    default: 
      return state
  }
    return newState
}

export default counterReducer