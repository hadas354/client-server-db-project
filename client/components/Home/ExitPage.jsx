import React from 'react'
import { Link } from 'react-router-dom'

function ExitPage() {
  return (
    <div>
      <h2>Thank you for being with us.🤗<br />
        see you again😊!
      </h2>
      <Link to="/">Enter again↩</Link>
    </div>
  )
}

export default ExitPage
