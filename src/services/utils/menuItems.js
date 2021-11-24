import SubjectOutlined from '@material-ui/icons/SubjectOutlined'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded'
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded'
import GroupIcon from '@material-ui/icons/Group'
import WidgetsIcon from '@material-ui/icons/Widgets'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import PolymerIcon from '@material-ui/icons/Polymer'
import EcoIcon from '@material-ui/icons/Eco'
import MoneyIcon from '@material-ui/icons/Money'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ReceiptIcon from '@material-ui/icons/Receipt'
import ViewCarouselRoundedIcon from '@material-ui/icons/ViewCarouselRounded'
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded'
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded'
import PeopleIcon from '@material-ui/icons/People'



export const menuItems = [

    {
        id: 1,
        text: 'Dashboard',
        icon: <SubjectOutlined />,
        path: '/',
        parent: 0,
        children: []
    },
    {
        id: 2,
        text: 'Administration',
        icon: <SettingsRoundedIcon />,
        path: '*',
        parent: 0,
        children: [
            {
                id: 3,
                text: 'Roles',
                icon: <AssignmentIndRoundedIcon />,
                path: '/roles',
                parent: 2
            },
            {
                id: 4,
                text: 'Departments',
                icon: <BusinessRoundedIcon />,
                path: '/departments',
                parent: 2
            },
            {
                id: 5,
                text: 'Groups',
                icon: <GroupIcon />,
                path: '/groups',
                parent: 2
            },
            {
                id: 7,
                text: 'Modules',
                icon: <WidgetsIcon />,
                path: '/modules',
                parent: 2
            },
            {
                id: 8,
                text: 'Staff',
                icon: <PeopleIcon />,
                path: '/staff',
                parent: 2
            }
        ]
    },
    {
        id: 8,
        text: 'Structure',
        icon: <HomeWorkIcon />,
        path: '*',
        parent: 0,
        children: [
            {
                id: 9,
                text: 'Grade Levels',
                icon: <PolymerIcon />,
                path: '/grade-levels',
                parent: 8
            },
            {
                id: 10,
                text: 'Benefits',
                icon: <EcoIcon />,
                path: '/benefits',
                parent: 8
            },
            {
                id: 11,
                text: 'Wages',
                icon: <MoneyIcon />,
                path: '/benefit/wages',
                parent: 8
            },
        ]
    },
    {
        id: 12,
        text: 'Budget Control',
        icon: <AccountBalanceIcon />,
        path: '*',
        parent: 0,
        children: [
            {
                id: 13,
                text: 'Budget Heads',
                icon: <LocalConvenienceStoreIcon />,
                path: '/budget-heads',
                parent: 12
            },
            {
                id: 14,
                text: 'Sub Budget Heads',
                icon: <ListAltIcon />,
                path: '/sub-budget-heads',
                parent: 12
            },
            {
                id: 15,
                text: 'Fund SBH',
                icon: <MonetizationOnIcon />,
                path: '/funds',
                parent: 12
            },
            {
                id: 16,
                text: 'Expenditure',
                icon: <ReceiptIcon />,
                path: '/expenditures',
                parent: 12
            },
            {
                id: 17,
                text: 'Batch Payments',
                icon: <ViewCarouselRoundedIcon />,
                path: '/batch/claim',
                parent: 12
            },
            {
                id: 18,
                text: 'Payments',
                icon: <PaymentRoundedIcon />,
                path: '/payments',
                parent: 12
            }
        ]
    },
    {
        id: 19,
        text: 'Staff Services',
        icon: <BusinessCenterRoundedIcon />,
        path: '*',
        parent: 0,
        children: [
            {
                id: 20,
                text: 'Claims',
                icon: <AttachMoneyRoundedIcon />,
                path: '/claims',
                parent: 19
            },
        ]
    },
    {
        id: 21,
        text: 'Approvals',
        icon: <ThumbUpAltRoundedIcon />,
        path: '*',
        parent: 0,
        children: [
            {
                id: 22,
                text: 'Expenditures',
                icon: <CreditCardRoundedIcon />,
                path: '/approve/expenditures',
                parent: 21
            }
        ]
    }
]