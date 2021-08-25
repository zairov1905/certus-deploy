// import "./App.css";
import { Route } from "react-router";
import Login from "../../features/auth/Login";
import Header from "../../features/dashboard/commonPage/Header";
import Sidebar from "../../features/dashboard/commonPage/Sidebar";
import SubHeader from "../../features/dashboard/commonPage/SubHeader";
import HomePage from "../../features/dashboard/homePage/HomePage";
import Employees from "../../features/dashboard/employees/Employees";
import Footer from "../../features/dashboard/commonPage/Footer";
import { ToastContainer } from "react-toastify";
import ModalManager from "../modal/ModalManager";
import OrderPage from "../../features/dashboard/orderPage/OrderPage";
import LabPage from "../../features/dashboard/labPage/LabPage";
import ExpensePage from "../../features/dashboard/expensePage/ExpensePage";
import DocumetTypePage from "../../features/dashboard/settings/documentType/DocumentTypePage";
import DepartmentPage from "../../features/dashboard/settings/department/DepartmentPage";
import DutyPage from "../../features/dashboard/settings/duty/DutyPage";
import DocPage from "../../features/dashboard/docPage/DocPage";
import CounterpartyPage from "../../features/dashboard/settings/counterparty/CounterpartyPage";
import ExpenseGroupPage from "../../features/dashboard/settings/expenseGroup/ExpenseGroupPage";
import ExpenseTypePage from "../../features/dashboard/settings/expenseType/ExpenseTypePage";
import ServiceTypePage from "../../features/dashboard/settings/serviceType/ServiceTypePage";
import OrderSourcePage from "../../features/dashboard/settings/orderSource/OrderSourcePage";
import ReferencePage from "../../features/dashboard/settings/reference/ReferencePage";
import CrmPage from "../../features/dashboard/crmPage/CrmPage";
import OperationPage from "../../features/dashboard/operationPage/OperationPage";
import ProductServicePage from "../../features/dashboard/certifications/productServicePage/ProductServicePage";
import SignOfLegalActPage from "../../features/dashboard/settings/signOfLegalAct/SignOfLegalActPage";
import SkillPage from "../../features/dashboard/settings/skill/SkillPage";
import TrainingPage from "../../features/dashboard/settings/training/TrainingPage";
import PersonalPage from "../../features/dashboard/certifications/personalPage/PersonalPage";
import React from "react";
import ControlSystemPage from "../../features/dashboard/certifications/controlSystem/ControlSystemPage";
function App() {
  // const { initialized } = useSelector((state) => state.async);
  // useScript("../../../public/assets/js/app.js")
  // useScript("../../../public/assets/js/custom.js")
  // if(!initialized) return (
  //   <div id="load_screen"> <div class="loader"> <div class="loader-content">
  //       <div class="spinner-grow align-self-center"></div>
  //   </div></div></div>
  //  )

  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" />
      <ModalManager />

      <Route exact path="/" component={Login} />
      <Route
        path={"/(.+)"}
        render={() => (
          <React.Fragment>
            <Header />
            <SubHeader />
            {/* BEGIN MAIN CONTAINER */}
            <div className="main-container" id="container">
              <div className="overlay"></div>
              <div className="search-overlay"></div>
              {/* BEGIN SIDEBAR */}
              <Sidebar />
              {/* END SIDEBAR */}

              {/* BEGIN PAGE CONTENT */}
              <div id="content" className="main-content">
                <Route exact path="/dashboard" component={HomePage} />
                <Route exact path="/crm" component={CrmPage} />
                <Route exact path="/employees" component={Employees} />
                <Route exact path="/orders" component={OrderPage} />
                <Route exact path="/operation" component={OperationPage} />
                <Route exact path="/labs" component={LabPage} />
                <Route exact path="/documents" component={DocPage} />
                <Route exact path="/expense" component={ExpensePage} />
                <Route
                  exact
                  path="/settings/documentTypes"
                  component={DocumetTypePage}
                />
                <Route
                  exact
                  path="/settings/departments"
                  component={DepartmentPage}
                />
                <Route exact path="/settings/duties" component={DutyPage} />
                <Route
                  exact
                  path="/settings/counterparties"
                  component={CounterpartyPage}
                />
                <Route
                  exact
                  path="/settings/expenseGroups"
                  component={ExpenseGroupPage}
                />
                <Route
                  exact
                  path="/settings/expenseTypes"
                  component={ExpenseTypePage}
                />
                <Route
                  exact
                  path="/settings/serviceTypes"
                  component={ServiceTypePage}
                />
                <Route
                  exact
                  path="/settings/orderSources"
                  component={OrderSourcePage}
                />
                <Route
                  exact
                  path="/settings/references"
                  component={ReferencePage}
                />
                <Route
                  exact
                  path="/settings/signOfLegalAct"
                  component={SignOfLegalActPage}
                />
                <Route exact path="/settings/skills" component={SkillPage} />
                <Route
                  exact
                  path="/settings/trainings"
                  component={TrainingPage}
                />
                <Route
                  exact
                  path="/certificates/productService"
                  component={ProductServicePage}
                />
                <Route
                  exact
                  path="/certificates/personal"
                  component={PersonalPage}
                />
                <Route
                  exact
                  path="/certificates/controlSystem"
                  component={ControlSystemPage}
                />
                <Footer />
              </div>

              {/* END PAGE CONTENT */}
            </div>
            {/* END MAIN CONTAINER */}
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
}

export default App;
