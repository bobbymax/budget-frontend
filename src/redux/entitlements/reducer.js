import * as actions from './types'

const initialState = {
    gradeLevels: {
        collection: [],
        gradeLevel: null
    },
    benefits: {
        collection: [],
        benefit: null,
        child: null
    },
    wages: {
        collection: [],
        wage: null
    },
    entitilements: {
        collection: [],
        entitlement: null
    },
    error: ""
}

const entitlementReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.FETCH_GRADE_LEVELS :
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    collection: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_BENEFITS :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    collection: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_WAGES :
            return {
                ...state,
                wages: {
                    ...state.wages,
                    collection: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_ENTITLEMENTS :
            return {
                ...state,
                entitilements: {
                    ...state.entitilements,
                    collection: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_GRADE_LEVEL_RECORD :
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    gradeLevel: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_BENEFIT_RECORD :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    benefit: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_BENEFIT_CHILD :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    child: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_WAGE_RECORD :
            return {
                ...state,
                wages: {
                    ...state.wages,
                    wage: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_ENTITLEMENT_RECORD :
            return {
                ...state,
                entitlements: {
                    ...state.entitlements,
                    entitlement: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_GRADE_LEVEL_RECORD :
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    collection: [action.payload.data, ...state.gradeLevels.collection],
                    gradeLevel: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_BENEFIT_RECORD :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    collection: [action.payload.data, ...state.benefits.collection],
                    benefit: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_WAGE_RECORD :
            return {
                ...state,
                wages: {
                    ...state.wages,
                    collection: [action.payload.data, ...state.wages.collection],
                    wage: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_ENTITLEMENT_RECORD :
            return {
                ...state,
                entitlements: {
                    ...state.entitlements,
                    collection: [action.payload.data, ...state.entitlements.collection],
                    entitlement: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_GRADE_LEVEL_RECORD :
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    collection: state.gradeLevels.collection.map((level => {
                        if(level.id === action.payload.data.id) {
                            return action.payload.data
                        }

                        return level
                    })),
                    gradeLevel: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_BENEFIT_RECORD :
        case actions.ADD_ENTITLEMENTS_FOR_GRADE_LEVELS :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    collection: state.benefits.collection.map((benefit => {
                        if(benefit.id === action.payload.data.id) {
                            return action.payload.data
                        }

                        return benefit
                    })),
                    benefit: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_WAGE_RECORD :
            return {
                ...state,
                wages: {
                    ...state.wages,
                    collection: state.wages.collection.map((wage => {
                        if(wage.id === action.payload.data.id) {
                            return action.payload.data
                        }

                        return wage
                    })),
                    wage: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_ENTITLEMENT_RECORD :
            return {
                ...state,
                entitlements: {
                    ...state.entitlements,
                    collection: state.entitlements.collection.map((entitlement => {
                        if(entitlement.id === action.payload.data.id) {
                            return action.payload.data
                        }

                        return entitlement
                    })),
                    entitlement: action.payload.data
                },
                error: ""
            }
        case actions.DELETE_GRADE_LEVEL_RECORD : 
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    collection: [...state.gradeLevels.collection.filter(level => level.id !== action.payload.data.id)],
                    gradeLevel: null
                },
                error: ""
            }
        case actions.DELETE_BENEFIT_RECORD : 
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    collection: [...state.benefits.collection.filter(benefit => benefit.id !== action.payload.data.id)],
                    benefit: null
                },
                error: ""
            }
        case actions.DELETE_WAGE_RECORD : 
            return {
                ...state,
                wages: {
                    ...state.wages,
                    collection: [...state.wages.collection.filter(wage => wage.id !== action.payload.data.id)],
                    wage: null
                },
                error: ""
            }
        case actions.DELETE_ENTITLEMENT_RECORD : 
            return {
                ...state,
                entitlements: {
                    ...state.entitlements,
                    collection: [...state.entitlements.collection.filter(entitlement => entitlement.id !== action.payload.data.id)],
                    entitlement: null
                },
                error: ""
            }
        case actions.FETCH_GRADE_LEVELS_FAILED : 
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    collection: [],
                    gradeLevel: null
                },
                error: action.payload
            }
        case actions.FETCH_BENEFITS_FAILED : 
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    collection: [],
                    benefit: null
                },
                error: action.payload
            }
        case actions.FETCH_WAGES_FAILED : 
            return {
                ...state,
                wages: {
                    ...state.wages,
                    collection: [],
                    wage: null
                },
                error: action.payload
            }
        case actions.FETCH_BENEFIT_CHILD_FAILED :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    child: null
                },
                error: action.payload
            }
        case actions.FETCH_ENTITLEMENTS_FAILED : 
            return {
                ...state,
                entitlements: {
                    ...state.entitlements,
                    collection: [],
                    entitlement: null
                },
                error: action.payload
            }
        case actions.FETCH_GRADE_LEVEL_RECORD_FAILED :
        case actions.CREATE_GRADE_LEVEL_RECORD_FAILED :
        case actions.UPDATE_GRADE_LEVEL_RECORD_FAILED :
        case actions.DELETE_GRADE_LEVEL_RECORD_FAILED :
            return {
                ...state,
                gradeLevels: {
                    ...state.gradeLevels,
                    gradeLevel: null
                },
                error: action.payload
            }
        case actions.FETCH_BENEFIT_RECORD_FAILED :
        case actions.CREATE_BENEFIT_RECORD_FAILED :
        case actions.UPDATE_BENEFIT_RECORD_FAILED :
        case actions.DELETE_BENEFIT_RECORD_FAILED :
        case actions.ADD_ENTITLEMENTS_FOR_GRADE_LEVELS_FAILED :
            return {
                ...state,
                benefits: {
                    ...state.benefits,
                    benefit: null
                },
                error: action.payload
            }
        case actions.FETCH_WAGE_RECORD_FAILED :
        case actions.CREATE_WAGE_RECORD_FAILED :
        case actions.UPDATE_WAGE_RECORD_FAILED :
        case actions.DELETE_WAGE_RECORD_FAILED :
            return {
                ...state,
                wages: {
                    ...state.wages,
                    wage: null
                },
                error: action.payload
            }
        case actions.FETCH_ENTITLEMENT_RECORD_FAILED :
        case actions.CREATE_ENTITLEMENT_RECORD_FAILED :
        case actions.UPDATE_ENTITLEMENT_RECORD_FAILED :
        case actions.DELETE_ENTITLEMENT_RECORD_FAILED :
            return {
                ...state,
                entitlements: {
                    ...state.entitlements,
                    entitlement: null
                },
                error: action.payload
            }
        default :
            return state
    }
}

export default entitlementReducer