export const canAccessModule = (module, auth) => {

    const roles = fetchLabels(auth)
    const moduleRoles = fetchLabels(module)

    return moduleRoles.some(el => roles.includes(el))
}

const canAccessPage = (module, auth) => {
    const depts = fetchDeptLabels(auth)
    const moduleDepts = fetchDeptLabels(module)

    return moduleDepts.some(el => depts.includes(el))
}

export const fetchAccessibleModules = (modules, auth) => {
    const accessible = []

    modules.forEach(mod => {

        if (auth.administrator) {
            accessible.push(formatModules(mod))
        } else {
            if (mod.type === "page") {
                if (canAccessModule(mod, auth)) accessible.push(formatModules(mod))
            } else {
                if (canAccessPage(mod, auth)) accessible.push(formatModules(mod))
            }
        }
        
    })

    return accessible
}

const formatModules = mod => {
    return {
        id: mod.id,
        text: mod.name,
        path: mod.path,
        parent: mod.parentId,
        icon: mod.icon,
        children: mod.children,
        type: mod.type
    }
}

const fetchDeptLabels = entity => {
    let depts = []

    entity.departments.forEach(el => {
        depts.push(el.label)
    })

    return depts
}


const fetchLabels = entity => {
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