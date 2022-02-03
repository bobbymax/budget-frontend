/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {ThemeProvider} from '@material-ui/core'
import { 
  Switch 
} from "react-router-dom"
import Loader from "./components/partials/Loader"
import ProtectedRoute from "./components/ProtectedRoute"
import PrivateRoute from "./components/PrivateRoute"
import {theme} from "./theme"
import { routes } from "./services/routes"
import Controllers from "./services/classes/Controllers"
// import ProtectedOutlet from "./components/ProtectedOutlet"

const App = () => {

  const [loading, setLoading] = useState(false)
  const [loadedModules, setLoadedModules] = useState([])

  const status = useSelector(state => state.access.isLoading)
  const auth = useSelector(state => state.access.staff.authenticatedUser)

  useEffect(() => {
    status === true ? setLoading(status) : setLoading(false)
  }, [status])

  useEffect(() => {
      if (auth) {
        Controllers.index('modules')
        .then(res => setLoadedModules(res.data.data))
        .catch(err => err.message)
      }
}, [auth])

  return (
    <ThemeProvider theme={theme}>
      {loading ? <Loader /> : null}
      <Switch>
        {routes.map((route, index) => {
          if (route.type === 'private') {
            return (
              <PrivateRoute 
                exact 
                key={index} 
                path={route.path} 
                component={route.component} 
              />
            )
          } else if (route.type === 'protected') {
            return (
              <ProtectedRoute 
                exact 
                key={index} 
                path={route.path} 
                component={route.component}
                modules={loadedModules}
              />
            )
          } else {
            return null
          }
        })}
      </Switch>
    </ThemeProvider>
  )
}

export default App
