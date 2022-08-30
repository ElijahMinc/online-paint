import React from "react"
import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"

export const GlobalToast = ({ text }) => {
  return (
    <ToastContainer className="p-3" position="bottom-end" closeBu>
      <Toast>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
