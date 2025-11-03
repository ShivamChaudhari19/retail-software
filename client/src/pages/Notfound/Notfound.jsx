import React from 'react'
import "./Notfound.css"

const Notfound = () => {
  return (
    <div className="notfound-container text-center d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="fw-semibold mb-3">Oops! Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <a href="/" className="btn btn-primary px-4 py-2">
        Go Back Home
      </a>
    </div>
  )
}

export default Notfound
