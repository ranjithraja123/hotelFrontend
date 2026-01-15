import React from 'react'
import './register.css'
import register from '../../../src/assets/images/register.png'

const Register = () => {
    return (
        // <div className='container w-100'>
        <div className='register row w-100'>
            <div className='left col-6'>
                <div className=' col-8 m-auto pt-5 '>
                    <h2 className='text-center'>Register</h2>
                    <form className='p-4'>
                        <div className="form-group">
                            <div className='p-2'>
                                <label>First Name</label>
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="" placeholder='Enter Firstname' />

                            </div>

                            <div className='p-2'>

                                <label>Last Name</label>
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="" placeholder='Enter Firstname' />
                            </div>

                            <div className='p-2'>

                                <label>Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="" placeholder='Enter Firstname' />

                            </div>

                            <div className='p-2'>

                                <label>Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword" aria-describedby="" placeholder='Enter Firstname' />

                            </div>

                            <div className='p-2'>
                                <label>Gender</label>
                                <div class="">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Male                                    </label>
                                    {/* </div> */}
                                    {/* <div class="form-check"> */}
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div className='m-auto justify-content-center text-center w-75 p-2'>
                                <button type="button" class="btn btn-success w-75">Success</button>

                            </div>


                        </div>
                    </form>

                </div>
            </div>
            <div className="right col-6 d-flex justify-content-center align-items-center">
                <img src={register} className="w-75 img-fluid" alt="Register Illustration" />
            </div>

        </div>


        // </div>
    )
}

export default Register
