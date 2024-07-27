
import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import NewTransaction from "./containers/NewTransaction/NewTransaction";
import Transaction from "./containers/Transaction/Transaction";
import EditDTransaction from "./containers/EditDTransaction/EditDTransaction";
import Categories from "./containers/Categories/Categories";
import NewCategory from "./containers/NewCategory/NewCategory";

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
                  <Route path="/edit-transaction/:id" element={<EditDTransaction/>} />
                  <Route path="/categories" element={<Categories/>} />
                  <Route path="/new-categories" element={<NewCategory/>}/>
                  <Route path="*" element={<h1>Not found!</h1>} />
              </Routes>
          </main>
      </>
  )
}

export default App
