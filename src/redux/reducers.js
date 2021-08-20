import { combineReducers } from "redux"
import accessControlReducer from "./accessControl/reducer"
import entitlementReducer from "./entitlements/reducer"
import budgettingReducer from "./budget/reducer"
import paymentReducer from "./payments/reducer"

const reducers = combineReducers({
    access: accessControlReducer,
    entitlements: entitlementReducer,
    budgetting: budgettingReducer,
    payments: paymentReducer
})

export default reducers