'use client'
import Aos from 'aos'
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'

function AOSInit() {
    useEffect(()=>{
        Aos.init()
    },[])

  return null
}

export default AOSInit