import React from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'

function page({children }) {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  )
}

export default page