/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { 
  Switch 
} from "react-router-dom"
import Loader from "./components/partials/Loader"
import ProtectedRoute from "./components/ProtectedRoute"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./components/pages/Dashboard"
import Roles from "./components/pages/Roles"
import Login from "./components/pages/Auth/Login"
import UpdateRole from "./components/pages/Roles/UpdateRole"
import Departments from "./components/pages/departments/Departments"
import Department from "./components/pages/departments/Department"
import Groups from "./components/pages/groups/Groups"
import Group from "./components/pages/groups/Group"
import BudgetHeads from "./components/pages/budgetHeads/BudgetHeads"
import BudgetHeadsImport from "./components/pages/budgetHeads/BudgetHeadsImport"
import BudgetHead from "./components/pages/budgetHeads/BudgetHead"
import SubBudgetHeads from "./components/pages/budgetHeads/SubBudgetHeads"
import SubBudgetHead from "./components/pages/budgetHeads/SubBudgetHead"
import CreditSubBudgetHead from "./components/pages/budgetHeads/CreditSubBudgetHead"
import GradeLevels from "./components/pages/grades/GradeLevels"
import Benefits from "./components/pages/benefits/Benefits"
import Prices from "./components/pages/prices/Prices"
import Modules from "./components/pages/modules/Modules"
import Employees from "./components/pages/staff/Employees"
import Claims from "./components/pages/claims/Claims"
import Instructions from "./components/pages/claims/Instructions"
import { Claim } from "./components/pages/claims/Claim"
import Batch from "./components/pages/claims/Batch"
import Expenditure from "./components/pages/claims/Expenditure"
import Payments from "./components/pages/payments/Payments"
import Approvals from "./components/pages/payments/Approvals"
import WorkFlows from "./components/pages/workflows/WorkFlows"
import Procedures from "./components/pages/workflows/Procedures"
import Pages from "./components/pages/Pages"
import Funds from "./components/pages/budgetHeads/Funds"
import Logistics from "./components/pages/refunds/Logistics"

const App = () => {

  const [loading, setLoading] = useState(false)

  const status = useSelector(state => state.access.isLoading)

  useEffect(() => {
    status === true ? setLoading(status) : setLoading(false)
  }, [status])

  return (
    <>
      {loading ? <Loader /> : null}
      <Switch>
        <PrivateRoute path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute exact path="/roles" component={Roles} />
        <ProtectedRoute path="/roles/:id/update" component={UpdateRole} />
        <ProtectedRoute exact path="/departments" component={Departments} />
        <ProtectedRoute path="/departments/create" component={Department} />
        <ProtectedRoute path="/departments/:id/update" component={Department} />
        <ProtectedRoute exact path="/groups" component={Groups} />
        <ProtectedRoute path="/groups/create" component={Group} />
        <ProtectedRoute path="/groups/:id/update" component={Group} />
        <ProtectedRoute exact path="/budget-heads" component={BudgetHeads} />
        <ProtectedRoute path="/budget-heads/import" component={BudgetHeadsImport} />
        <ProtectedRoute path="/budget-heads/:id/update" component={BudgetHead} />
        <ProtectedRoute exact path="/sub-budget-heads" component={SubBudgetHeads} />
        <ProtectedRoute path="/sub-budget-heads/create" component={SubBudgetHead} />
        <ProtectedRoute path="/sub-budget-heads/:id/update" component={SubBudgetHead} />
        <ProtectedRoute exact path="/funds" component={Funds} />
        <ProtectedRoute path="/grade-levels" component={GradeLevels} />
        <ProtectedRoute path="/benefits" component={Benefits} />
        <ProtectedRoute path="/benefit/wages" component={Prices} />
        <ProtectedRoute exact path="/modules" component={Modules} />
        <ProtectedRoute exact path="/modules/:id" component={Pages} />
        <ProtectedRoute exact path="/modules/:id/:params" component={Pages} />
        <ProtectedRoute exact path="/staff" component={Employees} />
        <ProtectedRoute exact path="/claims" component={Claims} />
        <ProtectedRoute exact path="/claims/:id/add/details" component={Instructions} />
        <ProtectedRoute exact path="/claims/:id/print" component={Claim} />
        <ProtectedRoute exact path="/expenditures" component={Expenditure} />
        <ProtectedRoute exact path="/batch/claim" component={Batch} />
        <ProtectedRoute exact path="/payments" component={Payments} />
        <ProtectedRoute exact path="/approve/expenditures" component={Approvals} />
        <ProtectedRoute exact path="/workflows" component={WorkFlows} />
        <ProtectedRoute exact path="/procedures" component={Procedures} />
        <ProtectedRoute exact path="/logistics/refund" component={Logistics} />
      </Switch>
    </>
  )
}

export default App;
