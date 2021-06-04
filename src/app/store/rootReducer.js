import { combineReducers } from 'redux'
import authReducer from '../../features/auth/authReducer';
import personalReducer from '../../features/dashboard/certifications/personalPage/personalReducer';
import productServiceReducer from '../../features/dashboard/certifications/productServicePage/productServiceReducer';
import crmReducer from '../../features/dashboard/crmPage/crmReducer';
import docReducer from '../../features/dashboard/docPage/docReducer';
import employeesReducer from '../../features/dashboard/employees/employeesReducer';
import expenseReducer from '../../features/dashboard/expensePage/expenseReducer';
import labReducer from '../../features/dashboard/labPage/labReducer';
import operationReducer from '../../features/dashboard/operationPage/oparationReducer';
import orderReducer from '../../features/dashboard/orderPage/orderReducer';
import counterpartyReducer from '../../features/dashboard/settings/counterparty/counterpartyReducer';
import departmentReducer from '../../features/dashboard/settings/department/departmentReducer';
import documentTypesReducer from '../../features/dashboard/settings/documentType/documentTypeReducer';
import dutyReducer from '../../features/dashboard/settings/duty/dutyReducer';
import expenseGroupReducer from '../../features/dashboard/settings/expenseGroup/expenseGroupReducer';
import expenseTypeReducer from '../../features/dashboard/settings/expenseType/expenseTypeReducer';
import orderSourceReducer from '../../features/dashboard/settings/orderSource/orderSourceReducer';
import referenceReducer from '../../features/dashboard/settings/reference/referenceReducer';
import serviceTypeReducer from '../../features/dashboard/settings/serviceType/serviceTypeReducer';
import signOfLegalActReducer from '../../features/dashboard/settings/signOfLegalAct/signOfLegalActsReducer';
import skillReducer from '../../features/dashboard/settings/skill/skillReducer';
import trainingReducer from '../../features/dashboard/settings/training/trainingReducer';
import asyncReducer from '../async/asyncReducer';
import modalReducer from '../modal/modalReducer';

const rootReducer = combineReducers({
    auth:authReducer,
    async:asyncReducer,
    modals:modalReducer,
    employees:employeesReducer,
    orders:orderReducer,
    operations: operationReducer,
    labs:labReducer,
    expenses:expenseReducer,
    documentTypes:documentTypesReducer,
    departments:departmentReducer,
    duties:dutyReducer,
    docs:docReducer,
    counterparties:counterpartyReducer,
    expenseGroups:expenseGroupReducer,
    expenseTypes:expenseTypeReducer,
    serviceTypes:serviceTypeReducer,
    orderSources:orderSourceReducer,
    references:referenceReducer,
    crms:crmReducer,
    productServices:productServiceReducer,
    signOfLegalActs:signOfLegalActReducer,
    skills:skillReducer,
    trainings:trainingReducer,
    personals:personalReducer 
})





export default rootReducer;