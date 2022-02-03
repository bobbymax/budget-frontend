// import authHeader from "../../redux/headers"
// import { API_ENDPOINT } from "../config"
// import axios from "axios"


// export const index = async entity => {
//     const res = await axios.get(`${API_ENDPOINT + entity}`, authHeader())
//     return res
// }

export const formatModules = (mods) => {
    const modules = []

    mods.forEach(mod => {
        modules.push({
            id: mod.id,
            name: mod.name,
            icon: mod.icon,
            path: mod.path,
            children: mod.children,
            type: mod.type,
            title: `${mod.name} page`
        })
    })

    return modules
}