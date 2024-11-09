import React from 'react'
import Courses from '../components/Courses';

const userData = {
    name: "John Doe",
    rollNumber: "CS2023001",
    studentId: "ST123456",
    address: "123 Main St, Springfield, USA",
    email: "john.doe@example.com",
    mobileNumber: "123-456-7890",
    parents: {
      name: "Jane Doe",
      address: "456 Elm St, Springfield, USA",
      email: "jane.doe@example.com",
      mobileNumber: "098-765-4321"
    },
    creditsCompleted: 30
  };


function ProfilePage() {



  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">User  Dashboard</h1>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">User  Information</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Roll Number:</strong> {userData.rollNumber}</p>
      <p><strong>Student ID:</strong> {userData.studentId}</p>
      <p><strong>Address:</strong> {userData.address}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Mobile Number:</strong> {userData.mobileNumber}</p>
      
      <h3 className="text-lg font-semibold mt-4">Parents Information</h3>
      <p><strong>Name:</strong> {userData.parents.name}</p>
      <p><strong>Address:</strong> {userData.parents.address}</p>
      <p><strong>Email:</strong> {userData.parents.email}</p>
      <p><strong>Mobile Number:</strong> {userData.parents.mobileNumber}</p>
      
      <p className="mt-4"><strong>Credits Completed:</strong> {userData.creditsCompleted}</p>
    </div>
    <Courses/>
  </div>
  )
}

export default ProfilePage