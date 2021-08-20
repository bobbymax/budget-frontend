import * as actions from './types'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    token: null,
    staff: {
        collection: [],
        authenticatedUser: null,
        employee: null,
        dashboard: null
    },
    roles: {
        collection: [],
        role: null,
    },
    departments: {
        collection: [],
        department: null
    },
    groups: {
        collection: [],
        group: null
    },
    modules: {
        collection: [],
        module: null
    },
    workflows: {
        collection: [],
        workflow: null
    },
    procedures: {
        collection: [],
        procedure: null
    },
    error: ""
}

const accessControlReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.LOADING_RESPONSE :
            return {
                ...state,
                isLoading: true
            }
        case actions.CLEAR_LOADER :
            return {
                ...state,
                isLoading: false
            }
        case actions.LOGIN_SUCCESSFUL : 
            localStorage.setItem('token', action.payload.data.token)
            return {
                ...state,
                isLoading: false,
                token: action.payload.data.token,
                isAuthenticated: true,
                staff: {
                    ...state.staff,
                    authenticatedUser: action.payload.data.user
                },
                error: ""
            }
        case actions.INVALID_CREDENTIALS :
        case actions.LOGIN_FAILURE : 
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isLoading: false,
                isAthenticated: false,
                staff: {
                    ...state.staff,
                    authenticatedUser: null,
                },
                dashboard: null,
                error: action.payload
            }
        case actions.FETCH_ALL_STAFF :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    collection: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_ROLES :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    collection: action.payload.data
                },
                error: ""     
            }
        case actions.FETCH_DEPARTMENTS :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    collection: action.payload.data
                },
                error: ""     
            }
        case actions.FETCH_GROUPS :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    collection: action.payload.data
                },
                error: ""     
            }
        case actions.FETCH_MODULES :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    collection: action.payload.data
                },
                error: ""     
            }
        case actions.FETCHED_WORKFLOWS :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    collection: action.payload.data
                },
                error: ""     
            }
        case actions.FETCHED_PROCEDURES :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    collection: action.payload.data
                },
                error: ""     
            }
        case actions.CREATE_STAFF_RECORD :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    collection: [action.payload.data, ...state.staff.collection],
                    employee: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_ROLE_RECORD :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    collection: [action.payload.data, ...state.roles.collection],
                    role: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_DEPARTMENT_RECORD :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    collection: [action.payload.data, ...state.departments.collection],
                    department: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_GROUP_RECORD :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    collection: [action.payload.data, ...state.groups.collection],
                    group: action.payload.data
                },
                error: ""
            }
        case actions.CREATE_MODULE_RECORD :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    collection: [action.payload.data, ...state.modules.collection],
                    module: action.payload.data
                },
                error: ""
            }
        case actions.CREATED_WORKFLOW_RECORD :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    collection: [action.payload.data, ...state.workflows.collection],
                    workflow: action.payload.data
                },
                error: ""
            }
        case actions.CREATED_PROCEDURE_RECORD :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    collection: [action.payload.data, ...state.procedures.collection],
                    procedure: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_STAFF_RECORD :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    collection: state.staff.collection.map((staff) => {
                        if (staff.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return staff
                    }),
                    authenticatedUser: state.staff.authenticatedUser.id === action.payload.data.id ? action.payload.data : state.staff.authenticatedUser,
                    employee: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_ROLE_RECORD :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    collection: state.roles.collection.map((role) => {
                        if (role.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return role
                    }),
                    role: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_DEPARTMENT_RECORD :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    collection: state.departments.collection.map((department) => {
                        if (department.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return department
                    }),
                    department: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_GROUP_RECORD :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    collection: state.groups.collection.map((group) => {
                        if (group.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return group
                    }),
                    group: action.payload.data
                },
                error: ""
            }
        case actions.UPDATE_MODULE_RECORD :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    collection: state.modules.collection.map((module) => {
                        if (module.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return module
                    }),
                    module: action.payload.data
                },
                error: ""
            }
        case actions.UPDATED_WORKFLOW_RECORD :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    collection: state.workflows.collection.map((workflow) => {
                        if (workflow.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return workflow
                    }),
                    workflow: action.payload.data
                },
                error: ""
            }
        case actions.UPDATED_PROCEDURE_RECORD :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    collection: state.procedures.collection.map((procedure) => {
                        if (procedure.id === action.payload.data.id) {
                            return action.payload.data
                        }
    
                        return procedure
                    }),
                    procedure: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_STAFF_RECORD :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    employee: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_ROLE_RECORD :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    role: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_DEPARTMENT_RECORD :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    department: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_GROUP_RECORD :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    group: action.payload.data
                },
                error: ""
            }
        case actions.FETCH_MODULE_RECORD :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    module: action.payload.data
                },
                error: ""
            }
        case actions.FETCHED_WORKFLOW_RECORD :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    workflow: action.payload.data
                },
                error: ""
            }
        case actions.FETCHED_PROCEDURE_RECORD :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    procedure: action.payload.data
                },
                error: ""
            }
        case actions.DELETE_STAFF_RECORD :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    collection: [
                        ...state.staff.collection.filter(staff => staff.id !== action.payload.data.id)
                    ],
                    employee: null
                },
                error: ""
            }
        case actions.DELETE_ROLE_RECORD :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    collection: [
                        ...state.roles.collection.filter(role => role.id !== action.payload.data.id)
                    ],
                    role: null
                },
                error: ""
            }
        case actions.DELETE_DEPARTMENT_RECORD :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    collection: [
                        ...state.departments.collection.filter(department => department.id !== action.payload.data.id)
                    ],
                    department: null
                },
                error: ""
            }
        case actions.DELETE_GROUP_RECORD :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    collection: [
                        ...state.groups.collection.filter(group => group.id !== action.payload.data.id)
                    ],
                    group: null
                },
                error: ""
            }
        case actions.DELETE_MODULE_RECORD :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    collection: [
                        ...state.modules.collection.filter(module => module.id !== action.payload.data.id)
                    ],
                    module: null
                },
                error: ""
            }
        case actions.DELETED_WORKFLOW_RECORD :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    collection: [
                        ...state.workflows.collection.filter(workflow => workflow.id !== action.payload.data.id)
                    ],
                    workflow: null
                },
                error: ""
            }
        case actions.DELETED_PROCEDURE_RECORD :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    collection: [
                        ...state.procedures.collection.filter(procedure => procedure.id !== action.payload.data.id)
                    ],
                    procedure: null
                },
                error: ""
            }
        case actions.CREATE_STAFF_RECORD_FAILED :
        case actions.UPDATE_STAFF_RECORD_FAILED :
        case actions.FETCH_STAFF_RECORD_FAILED :
        case actions.DELETE_STAFF_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    employee: null
                },
                error: action.payload
            }
        case actions.CREATE_ROLE_RECORD_FAILED :
        case actions.UPDATE_ROLE_RECORD_FAILED :
        case actions.FETCH_ROLE_RECORD_FAILED :
        case actions.DELETE_ROLE_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    role: null
                },
                error: action.payload
            }
        case actions.CREATE_DEPARTMENT_RECORD_FAILED :
        case actions.UPDATE_DEPARTMENT_RECORD_FAILED :
        case actions.FETCH_DEPARTMENT_RECORD_FAILED :
        case actions.DELETE_DEPARTMENT_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    department: null
                },
                error: action.payload
            }
        case actions.CREATE_GROUP_RECORD_FAILED :
        case actions.UPDATE_GROUP_RECORD_FAILED :
        case actions.FETCH_GROUP_RECORD_FAILED :
        case actions.DELETE_GROUP_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    group: null
                },
                error: action.payload
            }
        case actions.CREATE_MODULE_RECORD_FAILED :
        case actions.UPDATE_MODULE_RECORD_FAILED :
        case actions.FETCH_MODULE_RECORD_FAILED :
        case actions.DELETE_MODULE_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    module: null
                },
                error: action.payload
            }
        case actions.CREATED_WORKFLOW_RECORD_FAILED :
        case actions.UPDATED_WORKFLOW_RECORD_FAILED :
        case actions.FETCHED_WORKFLOW_RECORD_FAILED :
        case actions.DELETED_WORKFLOW_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    workflow: null
                },
                error: action.payload
            }
        case actions.CREATED_PROCEDURE_RECORD_FAILED :
        case actions.UPDATED_PROCEDURE_RECORD_FAILED :
        case actions.FETCHED_PROCEDURE_RECORD_FAILED :
        case actions.DELETED_PROCEDURE_RECORD_FAILED :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    procedure: null
                },
                error: action.payload
            }
        case actions.FETCH_ALL_STAFF_FAILED :
            return {
                ...state,
                isLoading: false,
                staff: {
                    ...state.staff,
                    collection: [],
                    employee: null,
                },
                error: action.payload
            }
        case actions.FETCH_ROLES_FAILED :
            return {
                ...state,
                isLoading: false,
                roles: {
                    ...state.roles,
                    collection: [],
                    role: null
                },
                error: action.payload
            }
        case actions.FETCH_DEPARTMENTS_FAILED :
            return {
                ...state,
                isLoading: false,
                departments: {
                    ...state.departments,
                    collection: [],
                    department: null
                },
                error: action.payload
            }
        case actions.FETCH_GROUPS_FAILED :
            return {
                ...state,
                isLoading: false,
                groups: {
                    ...state.groups,
                    collection: [],
                    group: null
                },
                error: action.payload
            }
        case actions.FETCH_MODULES_FAILED :
            return {
                ...state,
                isLoading: false,
                modules: {
                    ...state.modules,
                    collection: [],
                    module: null
                },
                error: action.payload
            }
        case actions.FETCHED_WORKFLOWS_FAILED :
            return {
                ...state,
                isLoading: false,
                workflows: {
                    ...state.workflows,
                    collection: [],
                    workflow: null
                },
                error: action.payload
            }
        case actions.FETCHED_PROCEDURES_FAILED :
            return {
                ...state,
                isLoading: false,
                procedures: {
                    ...state.procedures,
                    collection: [],
                    procedure: null
                },
                error: action.payload
            }
        default :
            return state
    }
}

export default accessControlReducer