export const canAccessModule = (module, auth) => {

    const roles = fetchLabels(auth)
    const moduleRoles = fetchLabels(module)

    return moduleRoles.some(el => roles.includes(el))
}

// export const fetchRoles = auth => {
//     let roles = []

//     auth.roles.forEach(el => {
//         roles.push(el.label)
//     })

//     return roles
// }

export const fetchLabels = entity => {
    let enty = []

    entity.roles.forEach(el => {
        enty.push(el.label)
    })

    return enty
}

export const userHasRole = (auth, role) => {
    const authRoles = fetchLabels(auth)
    return authRoles.includes(role)
}

export const grantAccessForBudgetClearing = (controller, owner) => {
    if (controller.roles.includes('budget-controller') && controller.department.id === owner.department.id) {
        return true
    }
    return false    
}

// export const fetchModuleRoles = module => {
//     let moduleRoles = []

//     module.roles.forEach(el => {
//         moduleRoles.push(el.label)
//     })

//     return moduleRoles
// }