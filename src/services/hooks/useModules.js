/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import Controllers from '../classes/Controllers'

const useModules = () => {

    const [modules, setModulesInternal] = useState([])
    
    const fetchedModules = useCallback(() => {
        Controllers.index('modules')
        .then(res => {
            setModules(res.data.data)
        })
        .catch(err => console.log(err.message))
    }, [])
    

    const setModules = data => {
        setModulesInternal(data)
    }

    useEffect(() => {
        fetchedModules()
    }, [])

    return [modules, setModules]
}

export default useModules
