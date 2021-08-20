import * as paymentActions from '../accessControl/types'

const initialState = {
    claims: {
        collection: [],
        claim: null
    },
    instructions: {
        collection: [],
        instruction: null
    },
    expenditures: {
        collection: [],
        expenditure: null,
        batch: null
    },
    batches: {
        collection: [],
        batch: null
    },
}

const paymentReducer = (state=initialState, action) => {
    switch(action.type) {
        case paymentActions.FETCHED_CLAIMS :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    collection: action.payload.data
                },
                error: ""
            }
        case paymentActions.FETCHED_CLAIM_INSTRUCTIONS :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    collection: action.payload.data
                },
                error: ""
            }
        case paymentActions.CREATED_CLAIM_RECORD :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    collection: [action.payload.data, ...state.claims.collection],
                    claim: null
                },
                error: ""
            }
        case paymentActions.CREATED_CLAIM_INSTRUCTION_RECORD :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    collection: [action.payload.data, ...state.instructions.collection],
                    instruction: null
                },
                error: ""
            }
        case paymentActions.UPDATED_CLAIM_RECORD :
        case paymentActions.REGISTERED_CLAIM_SUCCESSFULLY :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    collection: state.claims.collection.map((claim) => {
                        if (claim.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return claim
                    }),
                    claim: null
                },
                error: ""
            }
        case paymentActions.UPDATED_CLAIM_INSTRUCTION_RECORD :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    collection: state.instructions.collection.map((instruction) => {
                        if (instruction.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return instruction
                    }),
                    instruction: null
                },
                error: ""
            }
        case paymentActions.FETCHED_CLAIM_RECORD :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    claim: action.payload.data
                },
                error: ""
            }
        case paymentActions.FETCHED_CLAIM_INSTRUCTION_RECORD :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    instruction: action.payload.data
                },
                error: ""
            }
        case paymentActions.DELETED_CLAIM_RECORD :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    collection: [
                        ...state.claims.collection.filter(claim => claim.id !== action.payload.data.id)
                    ],
                    claim: null
                },
                error: ""
            }
        case paymentActions.DELETED_CLAIM_INSTRUCTION_RECORD :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    collection: [
                        ...state.instructions.collection.filter(instruction => instruction.id !== action.payload.data.id)
                    ],
                    instruction: null
                },
                error: ""
            }
        case paymentActions.FETCHED_CLAIMS_FAILED :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    collection: [],
                    claim: null
                },
                error: action.payload
            }
        case paymentActions.FETCHED_CLAIM_INSTRUCTIONS_FAILED :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    collection: [],
                    instruction: null
                },
                error: action.payload
            }
        case paymentActions.REGISTERED_CLAIM_FAILED :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    claim: null
                },
                error: action.payload
            }
        case paymentActions.CREATED_CLAIM_RECORD_FAILED :
        case paymentActions.UPDATED_CLAIM_RECORD_FAILED :
        case paymentActions.FETCHED_CLAIM_RECORD_FAILED :
        case paymentActions.DELETED_CLAIM_RECORD_FAILED :
            return {
                ...state,
                claims: {
                    ...state.claims,
                    claim: null
                },
                error: action.payload
            }
        case paymentActions.CREATED_CLAIM_INSTRUCTION_RECORD_FAILED :
        case paymentActions.UPDATED_CLAIM_INSTRUCTION_RECORD_FAILED :
        case paymentActions.FETCHED_CLAIM_INSTRUCTION_RECORD_FAILED :
        case paymentActions.DELETED_CLAIM_INSTRUCTION_RECORD_FAILED :
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    instruction: null
                },
                error: action.payload
            }
        default :
            return state
    }
}

export default paymentReducer