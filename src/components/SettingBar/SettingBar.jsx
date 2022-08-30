import { observer } from "mobx-react-lite"
import React from "react"
import toolState from "../../store/toolState"
import userState from "../../store/userState"
import "../../styles/toolbar.scss"

export const SettingBar = observer(() => {

  const handleLineWidth = (e) => {
    toolState.setLineWidth(e.target.value)
  }



  return (
    <nav className="navbar  navbar-expand-lg navbar-light">
      <div className="container-fluid justify-content-between">
        <div className="collapse navbar-collapse" id="toolbar">
          <label htmlFor="line-width" style={{ width: "150px" }}>
            Line thickness: {toolState.lineWidth}
          </label>
          <input
            type="range"
            style={{ margin: "0 10px", maxWidth: "100px" }}
            defaultValue={1}
            onChange={handleLineWidth}
            value={toolState.lineWidth}
            min={1}
            max={20}
            className="form-range"
          />
          <div>Online: {userState.users}</div>
        </div>
      </div>
      {/* <input id="line-width" type="number" /> */}
      {/* <label htmlFor='color-border'>Колір обводки</label> */}
      {/* <input onChange={e => toolState.setStrokeColor(e.target.value)} style={{ margin: '0 10px'}} id='color-border' type="color"/> */}
    </nav>
  )
})
