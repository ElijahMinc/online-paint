import React, { forwardRef, useRef, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

export const WelcomeModal = forwardRef(({ connect, isShow, onClose }, ref) => {
  const [isCopi, setCopy] = useState(false)

  const linkRef = useRef(null)

  const copyLinkHandle = () => {
    if (!linkRef.current) return

    linkRef.current.select()

    document.execCommand("copy")
    setCopy(true)
  }

  return (
    <Modal show={isShow} onHide={onClose}>
      <Modal.Header closeButton={false}>
        <Modal.Title>Enter your name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          ref={linkRef}
          style={{
            opacity: "0",
            position: "absolute",
            top: 0,
            left: "-500%",
          }}
          type="input"
          value={window.location.href}
        />

        <input className="form-control  mb-3" placeholder="Your name" type="text" ref={ref} />
        <button
          disabled={isCopi}
          className={`btn btn-${isCopi ? "outline-success" : "primary"}`}
          onClick={copyLinkHandle}
        >
          {isCopi ? "Coppied ^^" : "Copy link for your friend ^^"}
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={connect}>
          Enter
        </Button>
      </Modal.Footer>
    </Modal>
  )
})
