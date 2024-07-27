
import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import NewTransaction from "./containers/NewTransaction/NewTransaction";

const App=() =>{

  return (
      <>
          <header>
               <Toolbar/>
          </header>

          <main>
              <Routes>
                  <Route
                      path='/'
                  />
                  <Route path='/add_transaction' element={<NewTransaction/>}
                  />
                  <Route path="*" element={<h1>Not found!</h1>} />
              </Routes>
          </main>
      </>
  )
}

export default App
