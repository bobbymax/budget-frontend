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

const App = () => {

  const [loading, setLoading] = useState(false)

  const status = useSelector(state => state.access.isLoading)

  useEffect(() => {
    status === true ? setLoading(status) : setLoading(false)
  }, [status])

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
