import { observer } from "mobx-react-lite"
import React from "react"
import canvasState from "../../store/canvasState"
import toolState from "../../store/toolState"
import Brush from "../../tools/Brush"
import Circle from "../../tools/Circle"
import Line from "../../tools/Line"
import Rect from "../../tools/Rect"
import "../../styles/toolbar.scss"

export const Toolbar = observer(() => {
  const handleChangeColor = (e) => {
    toolState.setFillColor(e.target.value)
    toolState.setStrokeColor(e.target.value)
  }

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL()
    const a = document.createElement("a")

    a.href = dataUrl
    a.download = canvasState.sessionId + ".jpg"
    document.body.appendChild(a)

    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(dataUrl)
  }

  return (
    <nav className="navbar toolbar-nav navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-between"
          id="toolbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                id="brush"
                className="tool"
                onClick={() =>
                  toolState.setTool(
                    new Brush(
                      canvasState.canvas,
                      canvasState.socket,
                      canvasState.sessionId,
                      "brush"
                    )
                  )
                }
              />

              {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
            </li>
            <li className="nav-item ms-1">
              <button
                id="rect"
                className="tool"
                onClick={() =>
                  toolState.setTool(
                    new Rect(
                      canvasState.canvas,
                      canvasState.socket,
                      canvasState.sessionId,
                      "rect"
                    )
                  )
                }
              />
            </li>
            <li className="nav-item ms-1">
              <button
                id="circle"
                className="tool"
                onClick={() =>
                  toolState.setTool(
                    new Circle(
                      canvasState.canvas,
                      canvasState.socket,
                      canvasState.sessionId
                    )
                  )
                }
              />
            </li>
            <li className="nav-item ms-1">
              <button
                id="eraser"
                className="tool"
                onClick={() =>
                  toolState.setTool(
                    new Brush(
                      canvasState.canvas,
                      canvasState.socket,
                      canvasState.sessionId,
                      "eraser"
                    )
                  )
                }
              />
            </li>
            <li className="nav-item ms-1">
              <button
                id="line"
                className="tool"
                onClick={() =>
                  toolState.setTool(
                    new Line(
                      canvasState.canvas,
                      canvasState.socket,
                      canvasState.sessionId
                    )
                  )
                }
              />
            </li>
            <li className="nav-item ms-1">
              <button className="tool">
                <input
                  id="color"
                  type="color"
                  value={toolState?.defaultColor}
                  onChange={handleChangeColor}
                />
              </button>
            </li>
          </ul>
          <h3 className="d-flex align-items-center m-0">Paint Online</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                id="undo"
                className="tool btn"
                disabled={!canvasState.undoList.length}
                onClick={() => {
                  if (canvasState.undoList.length) {
                    const dataUrl = canvasState.undo()

                    canvasState.socket.send(
                      JSON.stringify({
                        method: "redraw",
                        id: canvasState.sessionId,
                        image: dataUrl,
                      })
                    )
                  }
                }}
              />
            </li>
            <li className="nav-item ms-1">
              <button
                id="redo"
                className="tool btn"
                disabled={!canvasState.redoList.length}
                onClick={() => {
                  if (canvasState.redoList.length) {
                    const dataUrl = canvasState.redo()

                    canvasState.socket.send(
                      JSON.stringify({
                        method: "redraw",
                        id: canvasState.sessionId,
                        image: dataUrl,
                      })
                    )
                  }
                }}
              />
            </li>
            <li className="nav-item ms-1">
              <button id="save" className="tool" onClick={() => download()} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
})
