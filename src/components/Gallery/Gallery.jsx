import React from 'react';
import './gallery.css'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBRow className='gallery p-4'>
            <div className='header d-flex justify-content-center'>

                <h2>Spotlight...</h2>
            </div>
            <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
                <img
                    src='https://images.unsplash.com/photo-1569157087866-f4a8e9250605?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Boat on Calm Water'
                />

                <img
                    src='https://i.pinimg.com/474x/14/97/0b/14970b8adf88171b60f6c11cbfe840bc.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Wintry Mountain Landscape'
                />
            </MDBCol>

            <MDBCol lg={4} className='mb-4 mb-lg-0'>
                <img
                    src='https://i.pinimg.com/474x/08/be/69/08be69ba385112d1b85a2940d9833394.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Mountains in the Clouds'
                />

                <img
                    src='https://i.pinimg.com/474x/43/ea/b7/43eab791c34c15796d06b1a9d0e15b5a.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Boat on Calm Water'
                />
            </MDBCol>

            <MDBCol lg={4} className='mb-4 mb-lg-0'>
                <img
                    src='https://i.pinimg.com/474x/30/f7/21/30f72137245f61fbc9b7c6b60a29984b.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Waves at Sea'
                />

                <img
                    src='https://i.pinimg.com/474x/86/75/cf/8675cf84aeac7e1defcbc9c1e935f5cd.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Yosemite National Park'
                />
            </MDBCol>
        </MDBRow>
    );
}