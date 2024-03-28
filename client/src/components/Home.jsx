/* eslint-disable no-unused-vars */
// Home.jsx
import React from 'react';
import { useParams,Outlet} from 'react-router-dom';
import NavigationBar from './navbarMenu/NavigationBar';


const Home = () => {
  const { id } = useParams();

  return (
    <div>
      <header>
        <NavigationBar id={id}/>
      </header>
      <Outlet />
    </div>
    
  );
};

export default Home;
