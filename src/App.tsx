
import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import NewTransaction from "./containers/containersTransaction/NewTransaction/NewTransaction";
import Transaction from "./containers/containersTransaction/Transaction/Transaction";
import EditTransaction from "./containers/containersTransaction/EditTransaction/EditTransaction";
import Categories from "./containers/containersCategories/Categories/Categories";
import NewCategory from "./containers/containersCategories/NewCategory/NewCategory";
import EditCategory from "./containers/containersCategories/EditCategory/EditCategory";

const App=() =>{

  return (
      <>
          <header className="mb-5">
               <Toolbar/>
          </header>

          <main>
              <Routes>
                  <Route
                      path='/' element={<Transaction/>}
                  />
                  <Route path='/add_transaction' element={<NewTransaction/>}
                  />
                  <Route path="/edit-transaction/:id" element={<EditTransaction/>} />
                  <Route path="/categories" element={<Categories/>} />
                  <Route path="/new-categories" element={<NewCategory/>}/>
                  <Route path="/edit-category/:id" element={<EditCategory/>}/>
                  <Route path="*" element={<h1>Not found!</h1>} />
              </Routes>
          </main>
      </>
  )
}

export default App
