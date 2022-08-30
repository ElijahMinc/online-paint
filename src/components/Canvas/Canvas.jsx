import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import "../../styles/canvas.scss"
import { useEffect } from "react"
import canvasState from "../../store/canvasState"
import { useRef } from "react"
import toolState from "../../store/toolState"
import Brush from "../../tools/Brush"

import { useParams } from "react-router-dom"
import Rect from "../../tools/Rect"
import Circle from "../../tools/Circle"
import Eraser from "../../tools/Eraser"
import Line from "../../tools/Line"
import { WelcomeModal } from "../Modal/WelcomeModal"
import userState from "../../store/userState"

export const Canvas = observer(() => {
  const canvasRef = useRef()
  const usernameRef = useRef()

  const [isShowModal, setShowModal] = useState(true)
  const onCloseModal = () => setShowModal(false)

  const params = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    // toolState.setTool(new Brush(canvasRef.current))
  }, [])

  const drawHandler = (ctx, msg) => {
    const figure = msg.figure

    switch (figure.type) {
      case "brush":
        toolState.setDefaultColor(figure.color)
        toolState.setLineWidth(figure.lineWidth)
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth)

        break
      case "rect":
        toolState.setDefaultColor(figure.color)
        toolState.setLineWidth(figure.lineWidth)

        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.lineWidth
        )

        break

      case "circle":
        toolState.setDefaultColor(figure.color)
        toolState.setLineWidth(figure.lineWidth)

        Circle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.color,
          figure.lineWidth
        )

        break

      case "eraser":
        toolState.setDefaultColor(figure.color)
        toolState.setLineWidth(figure.lineWidth)

        Eraser.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth)

        break

      case "line":
        toolState.setDefaultColor(figure.color)
        toolState.setLineWidth(figure.lineWidth)

        Line.staticDraw(
          ctx,
          figure.currentX,
          figure.currentY,
          figure.x,
          figure.y,
          figure.color,
          figure.lineWidth
        )

        break
      case "finish":
        ctx.beginPath()
        break
      default:
        break
    }
  }

  const redrawHandler = (ctx, imageURL) => {
    const img = new Image()
    img.src = imageURL
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
    }
  }

  useEffect(() => {
    if (!canvasState.username) return

    const socket = new WebSocket(process.env.REACT_APP_API_URL)

    canvasState.setSocket(socket)
    canvasState.setSessionId(params.id)
    toolState.setTool(new Brush(canvasRef.current, socket, params.id, "brush"))

    const ctx = canvasRef.current.getContext("2d")

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: "connection",
        })
      )
    }

    socket.onmessage = (event) => {
      let msg = JSON.parse(event.data)

      switch (msg.method) {
        case "connection":
          userState.setUsers(userState.users + 1)
          console.log(`Person ${msg.username} was connected`)
          break
        case "disconnect":
          userState.setUsers(userState.users - 1)
          window.location.reload()
          break
        case "draw":
          drawHandler(ctx, msg)
          break
        case "redraw":
          redrawHandler(ctx, msg.image)
          break
        default:
          break
      }
    }

    socket.onclose = () => {
      console.log("ON CLOSE SOCKET")
      socket.send(
        JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: "disconnect",
        })
      )
    }

    return () => {
      console.log("unmount")
      socket.close()
    }
  }, [canvasState.username.length])

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const connectHandler = () => {
    console.log("usernameRef.current.value", !usernameRef.current.value)
    if (usernameRef.current.value) {
      canvasState.setUsername(usernameRef.current.value)
      onCloseModal()
    }
  }

  return (
    <div className="canvas">
      <WelcomeModal
        ref={usernameRef}
        onClose={onCloseModal}
        isShow={isShowModal}
        connect={connectHandler}
      />
      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        width={900}
        height={600}
      />
    </div>
  )
})
