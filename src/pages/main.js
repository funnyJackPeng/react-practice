import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () =>{
  return  <div>
    main page
    <Outlet />
    </div>
}

export default Main
