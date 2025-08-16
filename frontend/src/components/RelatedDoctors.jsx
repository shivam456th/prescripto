import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({docId, speciality}) => {

    const {doctors} = useContext(AppContext)

    const [relDoc, setRelDocs] = useState([])

    useEffect(()=>{
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
        }
    }, [doctors, speciality, docId])

  return (
    <div>

    </div>
  )
} 

export default RelatedDoctors