import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchedLogin, fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'
import { Form, Input, Button, message } from 'antd'

const Login = () => {
    const { token, loading, users } = useSelector(store => store.auth)

    const [dataForBackend, setDataForBackend] = useState({
        phone: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            navigate("/", { replace: true })
        }
    }, [token])

    function login(e) {
        e.preventDefault()
        dispatch(fetchingLogin())
        axios
            .post("http://todo.paydali.uz/api/login", dataForBackend)
            .then(res => {
                message.success('Successful Login! Welcom to TodoList Web-site')
                dispatch(fetchedLogin({
                    payload: {
                        users: res.data.payload,
                        token: res.data.payload.token
                    }
                }))
                localStorage.setItem('token', res.data.payload.token)
                navigate("/", { replace: true })
            })
            .catch(err => {
                message.error('Login Error! Try again')
                dispatch(LoginError())
            })
    }
    return (
        <>
            <div className='auth-cont w-full h-screen flex justify-center items-center bg-gray-200'>

                <Form className='login w-[30%] mx-auto my-auto shadow-md rounded-md p-8 bg-white'>
                    <h1 className='flex items-center justify-center mb-4 text-4xl text-slate-700'>Login</h1>
                    <Form.Item>
                        <Input value={dataForBackend.phone} onChange={(e) => setDataForBackend({ ...dataForBackend, phone: e.target.value })} type="text" placeholder='Phone' />
                    </Form.Item>
                    <Form.Item>
                        <Input.Password value={dataForBackend.password} onChange={(e) => setDataForBackend({ ...dataForBackend, password: e.target.value })} type="password" placeholder='Password' />
                    </Form.Item>
                    <div className='flex justify-between'>
                    <Form.Item>
                        <Button onClick={login} className='w-full bg-blue-500' type='primary'>Submit</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button className='bg-blue-500' type='primary'>Forgot Password</Button>
                    </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login