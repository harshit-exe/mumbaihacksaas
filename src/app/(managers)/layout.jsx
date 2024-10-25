import React from 'react'

function page({children }) {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  )
}

export default page