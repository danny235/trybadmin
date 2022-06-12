import React from 'react'
import {logoImg} from '../assets/index'

const Logo = ({...rest}) => {
  return (
    <img {...rest} src={logoImg} alt="Logo" />
  )
}

export default Logo