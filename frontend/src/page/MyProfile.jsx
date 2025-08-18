import React, { useState } from 'react'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image:"https://images.unsplash.com/photo-1735523110182-d71bbe7acb96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "richaExample@gmail.com",
    phone: "+1 123 456 5667",
    address: {
      line1: "57 Cross, Richmond",
      line2: "57 Cross, ",

    },
    gender: "Male",
    dob: "2002-01-20 "
  })  

  const [isEdit, setIsEdit] = useState((true))

  return (
    <div>
      <div>
      <img src={userData.image} alt="" />

      {
        isEdit
        ? <input type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} />
        : <p>{userData.name}</p>
      }
      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone: </p>
          {
        isEdit
        ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} />
        : <p>{userData.phone}</p>
      }
          <p>Address: </p>
          {
        isEdit
        ? <p>
          <input onChange={(e) => setUserData(prev => ({ ...prev, address: {...prev.address, line1: e.target.value}}))} type="text" />
          <br />
          <input onChange={(e) => setUserData(prev => ({ ...prev, address: {...prev.address, line2: e.target.value}}))} type="text" />
        </p>
        : <p>{userData.address.line1}
        <br />
        {userData.address.line2  }
        </p>
        
      }
        </div>
      </div>
    </div>
    <p>BASIC INFORMATION</p>
    <div>
      <p>Gender: </p>
      {
        isEdit
        ? <select onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p>{userData.gender}</p>
      }
      <p>Birthday: </p>
      {
        isEdit
        ? <input type="text" onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.dob} />
        : <p>{userData.dob}</p>
      }
    </div>
    </div>
  )
}

export default MyProfile