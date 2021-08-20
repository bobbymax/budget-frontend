export const canAccessModule = (module, auth) => {

    const roles = fetchRoles(auth)
    const moduleRoles = fetchModuleRoles(module)

    return moduleRoles.some(el => roles.includes(el))
}

export const fetchRoles = auth => {
    let roles = []

    auth.roles.forEach(el => {
        roles.push(el.label)
    })

    return roles
}

export const userHasRole = (auth, role) => {
    const authRoles = fetchRoles(auth)
    return authRoles.includes(role)
}

export const grantAccessForBudgetClearing = (controller, owner) => {
    if (controller.roles.includes('budget-controller') && controller.department.id === owner.department.id) {
        return true
    }
    return false    
}

export const fetchModuleRoles = module => {
    let moduleRoles = []

    module.roles.forEach(el => {
        moduleRoles.push(el.label)
    })

    return moduleRoles
}