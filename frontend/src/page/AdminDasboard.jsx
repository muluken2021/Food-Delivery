import React from 'react'
import Sidebar from '../component/Sidebar'

const AdminDasboard = ({menuOpen, setMenuOpen}) => {
  return (
    <div>
     <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  )
}

export default AdminDasboard
