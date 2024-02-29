import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Space, Input, notification } from 'antd'

import { ROUTES } from 'constants/routes'

import { AppContext } from 'App'

function AboutPage() {
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [pin3, setPin3] = useState('')
  const [pin4, setPin4] = useState('')
  const inputRef = useRef(null)

 

  const navigate = useNavigate()

  const isUserLoggedIn = true

  useEffect(() => {
    console.log('Khởi tạo AboutPage')
  }, [])

  useEffect(() => {
    console.log('🚀 ~ useEffect run')
    if (pin1 === '2' && pin2 === '3' && pin3 === '1' && pin4 === '2') {
      notification.success({ message: 'Unlock' })
    }
  }, [pin1, pin2, pin3, pin4])

  const handleGoToCart = () => {
    if (isUserLoggedIn) {
      navigate(ROUTES.USER.CART)
    } else {
      notification.warning({ message: 'Please login to continue' })
    }
  }

  const handleFocusInput = () => {
    inputRef.current.focus()
    console.log(inputRef.current.input.offsetHeight)
  }

  return (
    <div>
      <h2>About Page</h2>
      <Link to={ROUTES.USER.HOME}>Go to Home</Link>
      <Button onClick={() => handleGoToCart()}>Go to cart</Button>
      <Button onClick={() => navigate('/')}>Click to Home</Button>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h3>Mời bạn nhập mã pin</h3>
      <Space>
        <Input value={pin1} onChange={(e) => setPin1(e.target.value)} />
        <Input value={pin2} onChange={(e) => setPin2(e.target.value)} />
        <Input value={pin3} onChange={(e) => setPin3(e.target.value)} />
        <Input value={pin4} onChange={(e) => setPin4(e.target.value)} />
      </Space>
      <div>
        <Input ref={inputRef} />
        <Button onClick={() => handleFocusInput()}>Focus input</Button>
      </div>
    </div>
  )
}

export default AboutPage
