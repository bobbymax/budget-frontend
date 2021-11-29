/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import Controllers from '../classes/Controllers'
// import { fetchAccessibleModules } from '../helpers/access'
// import useModules from './useModules'

const useNavigation = () => {


    const [accessible, setAccessible] = useState([])

    // useEffect(() => {
    //     if (! mods) {
    //         setAccessible([])
    //     } else {
    //         setAccessible(fetchAccessibleModules(mods, loggedIn))
    //     }
    // }, [mods, loggedIn])

    return accessible
}

export default useNavigation
