import ReactDom, { Link, Navigate, Route, Routes } from 'react-router-dom'
import Users from './Users'
import Posts from './Posts'
import Todos from './Todos'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import React, { useRef } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate()
    const items = [
     
        {
            label: 'Users',
            icon: 'pi pi-user',
            command: () => {
                navigate('./Users')
            }
        },
        {
            label: 'Posts',
            icon: 'pi pi-file',
            command: () => {
                navigate('./Posts')
            }
        },
        {
            label: 'Todos',
            icon: 'pi pi-list-check',
            command: () => {
                navigate('./Todos')
            }
        }
            ]
        


    // const startContent = (
    //     <React.Fragment>

    //     </React.Fragment>
    // );

    // const centerContent = (
    //     <div className="flex flex-wrap align-items-center gap-3">
    //         <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
    //             {/* <i className="pi pi-home text-2xl"></i> */}
    //             <Link to={'/users'}>Users</Link>
    //         </button>
    //         <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
    //             {/* <i className="pi pi-user text-2xl"></i> */}
    //             <Link to={'/posts'}>Posts</Link>

    //         </button>
    //         <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
    //             {/* <i className="pi pi-search text-2xl"></i> */}
    //             <Link to={'/todos'}>Todos</Link>

    //         </button>
    //     </div>
    // );
   


    return (
        <>
           

            {/* <div className="card" > */}

                {/* <Toolbar start={centerContent} left={centerContent} center={centerContent}  end={endContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-200 ), var(--bluegray-500))' }} /> */}
            {/* </div> */}
            <Menubar model={items}  style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-200 ), var(--bluegray-500))' }}/>


            {/* <Link to={'/Users'}>Users</Link><br></br>
            <Link to={'/Posts'}>Posts</Link><br></br>
            <Link to={'/todos'}>Todos</Link> */}

            <Routes>
                <Route path='/Users' element={<Users />} />
                <Route path='/Posts' element={<Posts />} />
                <Route path='/todos' element={<Todos />} />
            </Routes>

        </>
    )
}

export default Home