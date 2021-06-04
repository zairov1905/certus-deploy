import React from "react";
import { useSelector } from "react-redux";
import PersonalPageModal from "../../features/dashboard/certifications/personalPage/PersonalPageModal";
import ProductServicePageModal from "../../features/dashboard/certifications/productServicePage/ProductServicePageModal";
import CrmPageModal from "../../features/dashboard/crmPage/CrmPageModal";
import DocPageModal from "../../features/dashboard/docPage/DocPageModal";
import EmployeesModal from "../../features/dashboard/employees/EmployeesModal";
import ExpensePageModal from "../../features/dashboard/expensePage/ExpensePageModal";
import LabPageModal from "../../features/dashboard/labPage/LabPageModal";
import OperationPageModal from "../../features/dashboard/operationPage/OperationPageModal";
import OrderPageModal from "../../features/dashboard/orderPage/OrderPageModal";
import SelectEmployeeModal from "../../features/dashboard/orderPage/SelectEmployeeModal";
import CounterpartyPageModal from "../../features/dashboard/settings/counterparty/CounterpartyPageModal";
import DepartmentPageModal from "../../features/dashboard/settings/department/DepartmentPageModal";
import DocumentTypePageModal from "../../features/dashboard/settings/documentType/DocumentTypePageModal";
import DutyPageModal from "../../features/dashboard/settings/duty/DutyPageModal";
import ExpenseGroupPageModal from "../../features/dashboard/settings/expenseGroup/ExpenseGroupPageModal";
import ExpenseTypePageModal from "../../features/dashboard/settings/expenseType/ExpenseTypePageModal";
import OrderSourcePageModal from "../../features/dashboard/settings/orderSource/OrderSourcePageModal";
import ReferencePageModal from "../../features/dashboard/settings/reference/ReferencePageModal";
import ServiceTypePageModal from "../../features/dashboard/settings/serviceType/ServiceTypePageModal";
import SignOfLegalActPageModal from "../../features/dashboard/settings/signOfLegalAct/SignOfLegalActPageModal";
import SkillPageModal from "../../features/dashboard/settings/skill/SkillPageModal";
import TrainingPageModal from "../../features/dashboard/settings/training/TrainingPageModal";

export default function ModalManager() {
  const modalLookup = {
    EmployeesModal,
    OrderPageModal,
    LabPageModal,
    ExpensePageModal,
    DocumentTypePageModal,
    DepartmentPageModal,
    DutyPageModal,
    DocPageModal,
    CounterpartyPageModal,
    ExpenseGroupPageModal,
    ExpenseTypePageModal,
    ServiceTypePageModal,
    OrderSourcePageModal,
    ReferencePageModal,
    CrmPageModal,
    OperationPageModal,
    SelectEmployeeModal,
    ProductServicePageModal,
    SignOfLegalActPageModal,
    SkillPageModal,
    TrainingPageModal,
    PersonalPageModal
  };
  

  const currenModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currenModal) {
    const { modalType, modalProps } = currenModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
