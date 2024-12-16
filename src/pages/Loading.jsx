import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const containerClasses = [
  "loading-container",
  "flex",
  "items-center",
  "justify-center",
  "h-screen",
  "bg-[#0A2342]"
].join(' ')

const imageClasses = [
  "loading-image",
  "w-[470px]",
  "h-[610px]"
].join(' ')

const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/navigation')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className={containerClasses}>
      <img
        src="/src/assets/Logo.png"
        alt="Legacy Logo"
        className={imageClasses}
      />
    </div>
  )
}

export default Loading
