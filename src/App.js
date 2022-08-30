import { Canvas } from "./components/Canvas/Canvas"
import { SettingBar } from "./components/SettingBar/SettingBar"
import { Toolbar } from "./components/Toolbar/Toolbar"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import "./styles/app.scss"

function App() {
  
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/:id">
            <Toolbar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
