import { menuItems1 } from '@/components/navbar/menuItems';
import Navbar from '@/components/navbar/navbar';
import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import UserManagement from './UserManagement';
import Attendance from './Attendance';
import Projects from './Projects';
import Checkouts from './Checkouts';

import DashboardAdmin from './Dashboard';

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
`;
function UserAdmin() {
  const [active, setActive] = useState(1)

console.log("Running")
  const displayData = () => {
    switch(active){
      case 1:
        return <DashboardAdmin />
      case 2:
        return < UserManagement/>
      case 3:
        return <Attendance />
      case 4: 
        return <Projects />
      default: 
        return <Checkouts/>
    }
  };
  return (
    
    <MainLayout>
    <Navbar active={active} setActive={setActive} menuItems={menuItems1}/>
        <main>
          {displayData()}
        </main>
    </MainLayout>
   
  );
}



export default UserAdmin;