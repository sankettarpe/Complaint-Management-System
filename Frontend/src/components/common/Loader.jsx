import React from 'react'

const Loader = () => {
  return (
    <div className="text-center" style= {{width : "3rem" ,height: "3rem"}}>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
  )
}

export default Loader