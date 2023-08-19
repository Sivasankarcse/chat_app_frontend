import { takeEvery, put } from 'redux-saga/effects'
import { SET_USER_DATA, USER_LIST } from './constants'

function* userList() {
    // console.warn("Saga function called")
    const url = "https://dummyjson.com/users"
    let data = yield fetch(url);
    data = yield data.json();
    yield put({ type: SET_USER_DATA, data })
}
 
function* sagaData() {
    yield takeEvery(USER_LIST, userList)
}

export default sagaData