import Login from "../../components/pages/Auth/Login";
import Dashboard from "../../components/pages/Dashboard";
import Department from "../../components/pages/departments/Department";
import Departments from "../../components/pages/departments/Departments";
import Groups from "../../components/pages/groups/Groups";
import Group from "../../components/pages/groups/Group"
import Roles from "../../components/pages/Roles";
import UpdateRole from "../../components/pages/Roles/UpdateRole";
import BudgetHeads from "../../components/pages/budgetHeads/BudgetHeads";
import BudgetHeadsImport from "../../components/pages/budgetHeads/BudgetHeadsImport";
import BudgetHead from "../../components/pages/budgetHeads/BudgetHead";
import SubBudgetHeads from "../../components/pages/budgetHeads/SubBudgetHeads";
import SubBudgetHead from "../../components/pages/budgetHeads/SubBudgetHead";
import Funds from "../../components/pages/budgetHeads/Funds";
import GradeLevels from "../../components/pages/grades/GradeLevels";
import Benefits from "../../components/pages/benefits/Benefits";
import Prices from "../../components/pages/prices/Prices";
import Modules from "../../components/pages/modules/Modules";
import Pages from "../../components/pages/Pages";
import Employees from "../../components/pages/staff/Employees";
import Claims from "../../components/pages/claims/Claims";
import Instructions from "../../components/pages/claims/Instructions";
import Claim from "../../components/pages/claims/Claim";
import Expenditure from "../../components/pages/claims/Expenditure";
import Batch from "../../components/pages/claims/Batch";
import Payments from "../../components/pages/payments/Payments";
import Approvals from "../../components/pages/payments/Approvals";
import WorkFlows from "../../components/pages/workflows/WorkFlows";
import Procedures from "../../components/pages/workflows/Procedures";
import Logistics from "../../components/pages/refunds/Logistics";
import RefundRequests from "../../components/pages/refunds/RefundRequests";
import Reversals from "../../components/pages/refunds/Reversals";
import ImportGroups from "../../components/pages/imports/ImportGroups";
import Overview from "../../components/pages/overview/Overview";

export const routes = [
    {
        title: 'Login',
        type: 'private',
        path: '/login',
        component: Login
    },
    {
        title: 'Dashboard',
        type: 'protected',
        path: '/',
        component: Dashboard
    },
    {
        title: 'Roles',
        type: 'protected',
        path: '/roles',
        component: Roles
    },
    {
        title: 'Update Role',
        type: 'protected',
        path: '/roles/:id/update',
        component: UpdateRole
    },
    {
        title: 'Departments',
        type: 'protected',
        path: '/departments',
        component: Departments
    },
    {
        title: 'Create Department',
        type: 'protected',
        path: '/departments/create',
        component: Department
    },
    {
        title: 'Update Department',
        type: 'protected',
        path: '/departments/:id/update',
        component: Department
    },
    {
        title: 'Groups',
        type: 'protected',
        path: '/groups',
        component: Groups
    },
    {
        title: 'Create Group',
        type: 'protected',
        path: '/groups/create',
        component: Group
    },
    {
        title: 'Update Group',
        type: 'protected',
        path: '/groups/:id/update',
        component: Group
    },
    {
        title: 'Budget Heads',
        type: 'protected',
        path: '/budget-heads',
        component: BudgetHeads
    },
    {
        title: 'Import Budget Heads',
        type: 'protected',
        path: '/budget-heads/import',
        component: BudgetHeadsImport
    },
    {
        title: 'Update Budget Head',
        type: 'protected',
        path: '/budget-heads/:id/update',
        component: BudgetHead
    },
    {
        title: 'Sub Budget Heads',
        type: 'protected',
        path: '/sub-budget-heads',
        component: SubBudgetHeads
    },
    {
        title: 'Create Sub Budget Head',
        type: 'protected',
        path: '/sub-budget-heads/create',
        component: SubBudgetHead
    },
    {
        title: 'Update Sub Budget Head',
        type: 'protected',
        path: '/sub-budget-heads/:id/update',
        component: SubBudgetHead
    },
    {
        title: 'Funds',
        type: 'protected',
        path: '/funds',
        component: Funds
    },
    {
        title: 'Grade Levels',
        type: 'protected',
        path: '/grade-levels',
        component: GradeLevels
    },
    {
        title: 'Benefits',
        type: 'protected',
        path: '/benefits',
        component: Benefits
    },
    {
        title: 'Wages',
        type: 'protected',
        path: '/benefits/wages',
        component: Prices
    },
    {
        title: 'Modules',
        type: 'protected',
        path: '/modules',
        component: Modules
    },
    {
        title: 'Pages',
        type: 'protected',
        path: '/modules/:id',
        component: Pages
    },
    {
        title: 'Update Pages',
        type: 'protected',
        path: '/modules/:id/:params',
        component: Pages
    },
    {
        title: 'Staff',
        type: 'protected',
        path: '/staff',
        component: Employees
    },
    {
        title: 'Staff Claims',
        type: 'protected',
        path: '/claims',
        component: Claims
    },
    {
        title: 'Claim Instructions',
        type: 'protected',
        path: '/claims/:id/add/details',
        component: Instructions
    },
    {
        title: 'Print Claim',
        type: 'protected',
        path: '/claims/:id/print',
        component: Claim
    },
    {
        title: 'Expenditure',
        type: 'protected',
        path: '/expenditures',
        component: Expenditure
    },
    {
        title: 'Batch',
        type: 'protected',
        path: '/batch/claim',
        component: Batch
    },
    {
        title: 'Payments',
        type: 'protected',
        path: '/payments',
        component: Payments
    },
    {
        title: 'Approvals',
        type: 'protected',
        path: '/approve/expenditures',
        component: Approvals
    },
    {
        title: 'Work Flows',
        type: 'protected',
        path: '/workflows',
        component: WorkFlows
    },
    {
        title: 'Procedures',
        type: 'protected',
        path: '/procedures',
        component: Procedures
    },
    {
        title: 'Logistics Refund',
        type: 'protected',
        path: '/logistics/refund',
        component: Logistics
    },
    {
        title: 'Refund Requests',
        type: 'protected',
        path: '/refund/requests',
        component: RefundRequests
    },
    {
        title: 'Reversals',
        type: 'protected',
        path: '/reversals',
        component: Reversals
    },
    {
        title: 'Import Dependencies',
        type: 'protected',
        path: '/import/dependencies',
        component: ImportGroups
    },
    {
        title: 'Account Summary',
        type: 'protected',
        path: '/overview',
        component: Overview
    },
]