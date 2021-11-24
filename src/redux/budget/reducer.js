import * as budgetActions from '../accessControl/types'

const initialState = {
    budgetHeads: {
        collection: [],
        budgetHead: null,
        bulkUpload: []
    },
    subBudgetHeads: {
        collection: [],
        subBudgetHead: null,
        bulkUpload: []
    },
    expenditures: {
        collection: [],
        expenditure: null,
        batch: null
    },
    batches: {
        collection: [],
        batch: null,
        status: "",
        message: ""
    },
    funds: {
        collection: [],
        fund: null
    },
    error: ""
}

const budgettingReducer = (state=initialState, action) => {
    switch (action.type) {
        case budgetActions.FETCH_BUDGET_HEADS :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    collection: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCH_SUB_BUDGET_HEADS :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    collection: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCHED_EXPENDITURES :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    collection: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCHED_BATCHES :
            return {
                ...state,
                batches: {
                    ...state.batches,
                    collection: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCHED_FUNDS :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    collection: action.payload.data
                },
                error: ""
            }
        case budgetActions.CREATE_BUDGET_HEAD_RECORD :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    collection: [action.payload.data, ...state.budgetHeads.collection],
                    budgetHead: null
                },
                error: ""
            }
        case budgetActions.BULK_BUDGET_HEAD_UPLOAD :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    collection: action.payload.data,
                    bulkUpload: action.payload.data
                }
            }
        case budgetActions.BULK_BUDGET_HEAD_UPLOAD_FAILED :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    bulkUpload: []
                }
            }
        case budgetActions.CREATE_SUB_BUDGET_HEAD_RECORD :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    collection: [action.payload.data, ...state.subBudgetHeads.collection],
                    subBudgetHead: null
                },
                error: ""
            }
        case budgetActions.CREATED_EXPENDITURE_RECORD :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    collection: [action.payload.data, ...state.expenditures.collection],
                    expenditure: null
                },
                error: ""
            }
        case budgetActions.CREATED_FUND_RECORD :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    collection: [action.payload.data, ...state.funds.collection],
                    fund: null
                },
                error: ""
            }
        case budgetActions.BATCHED_EXPENDITURES :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    batch: action.payload.data
                },
                error: ""
            }
        case budgetActions.UPDATE_BUDGET_HEAD_RECORD :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    collection: state.budgetHeads.collection.map((budgetHead) => {
                        if (budgetHead.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return budgetHead
                    }),
                    budgetHead: null
                },
                error: ""
            }
        case budgetActions.UPDATE_SUB_BUDGET_HEAD_RECORD :
        case budgetActions.CLAIM_BUDGET_CLEARED :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    collection: state.subBudgetHeads.collection.map((subBudgetHead) => {
                        if (subBudgetHead.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return subBudgetHead
                    }),
                    subBudgetHead: null
                },
                error: ""
            }
        case budgetActions.UPDATED_EXPENDITURE_RECORD :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    collection: state.expenditures.collection.map((expenditure) => {
                        if (expenditure.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return expenditure
                    }),
                    expenditure: null
                },
                error: ""
            }
        case budgetActions.UPDATED_FUND_RECORD :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    collection: state.funds.collection.map(fund => {
                        if (fund.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return fund
                    }),
                    fund: null
                },
                error: ""
            }
        case budgetActions.FETCH_BUDGET_HEAD_RECORD :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    budgetHead: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCH_SUB_BUDGET_HEAD_RECORD :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    subBudgetHead: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCHED_EXPENDITURE_RECORD :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    expenditure: action.payload.data
                },
                error: ""
            }
        case budgetActions.FETCHED_BATCH_RECORD :
        case budgetActions.UPDATED_BATCHED_EXPENDITURE_RECORD :
        case budgetActions.BATCH_PAYMENT_CLEARED :
            return {
                ...state,
                batches: {
                    ...state.batches,
                    batch: action.payload.data,
                    status: action.payload.status,
                    message: action.payload.message
                },
                error: "",
            }
        case budgetActions.FETCHED_FUND_RECORD :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    fund: action.payload.data
                },
                error: ""
            }
        case budgetActions.DELETE_BUDGET_HEAD_RECORD :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    collection: [
                        ...state.budgetHeads.collection.filter(budgetHead => budgetHead.id !== action.payload.data.id)
                    ],
                    budgetHead: null
                },
                error: ""
            }
        case budgetActions.DELETE_SUB_BUDGET_HEAD_RECORD :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    collection: [
                        ...state.subBudgetHeads.collection.filter(subBudgetHead => subBudgetHead.id !== action.payload.data.id)
                    ],
                    subBudgetHead: null
                },
                error: ""
            }
        case budgetActions.DELETED_EXPENDITURE_RECORD :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    collection: [
                        ...state.expenditures.collection.filter(expenditure => expenditure.id !== action.payload.data.id)
                    ],
                    expenditure: null
                },
                error: ""
            }
        case budgetActions.DELETED_FUND_RECORD :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    collection: [
                        ...state.funds.collection.filter(fund => fund.id !== action.payload.data.id)
                    ],
                    fund: null
                },
                error: ""
            }
        case budgetActions.FETCH_BUDGET_HEADS_FAILED :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    collection: [],
                    budgetHead: null
                },
                error: action.payload
            }
        case budgetActions.FETCH_SUB_BUDGET_HEADS_FAILED :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    collection: [],
                    subBudgetHead: null
                },
                error: action.payload
            }
        case budgetActions.FETCHED_EXPENDITURES_FAILED :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    collection: [],
                    expenditure: null
                },
                error: action.payload
            }
        case budgetActions.FETCHED_BATCHES_FAILED :
            return {
                ...state,
                batches: {
                    ...state.batches,
                    collection: [],
                    batch: null
                },
                error: action.payload
            }
        case budgetActions.FETCHED_FUNDS_FAILED :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    collection: [],
                    fund: null
                },
                error: action.payload
            }
        case budgetActions.BATCHED_EXPENDITURES_FAILED :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    batch: null
                },
                error: action.payload
            }
        case budgetActions.CREATE_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.UPDATE_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.FETCH_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.DELETE_BUDGET_HEAD_RECORD_FAILED :
            return {
                ...state,
                budgetHeads: {
                    ...state.budgetHeads,
                    budgetHead: null
                },
                error: action.payload
            }
        case budgetActions.CREATE_SUB_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.UPDATE_SUB_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.FETCH_SUB_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.DELETE_SUB_BUDGET_HEAD_RECORD_FAILED :
        case budgetActions.CLAIM_BUDGET_CLEARED_FAILED :
            return {
                ...state,
                subBudgetHeads: {
                    ...state.subBudgetHeads,
                    subBudgetHead: null
                },
                error: action.payload
            }
        case budgetActions.CREATED_EXPENDITURE_RECORD_FAILED :
        case budgetActions.UPDATED_EXPENDITURE_RECORD_FAILED :
        case budgetActions.FETCHED_EXPENDITURE_RECORD_FAILED :
        case budgetActions.DELETED_EXPENDITURE_RECORD_FAILED :
            return {
                ...state,
                expenditures: {
                    ...state.expenditures,
                    expenditure: null
                },
                error: action.payload
            }
        case budgetActions.FETCHED_BATCH_RECORD_FAILED :
        case budgetActions.UPDATED_BATCHED_EXPENDITURE_RECORD_FAILED :
        case budgetActions.BATCH_PAYMENT_CLEARED_FAILED :
            return {
                ...state,
                batches: {
                    ...state.batches,
                    batch: null
                },
                error: action.payload
            }
        case budgetActions.CREATED_FUND_RECORD_FAILED :
        case budgetActions.UPDATED_FUND_RECORD_FAILED :
        case budgetActions.FETCHED_FUND_RECORD_FAILED :
        case budgetActions.DELETED_FUND_RECORD_FAILED :
            return {
                ...state,
                funds: {
                    ...state.funds,
                    fund: null
                },
                error: action.payload
            }
        default :
            return state
    }
}

export default budgettingReducer