import React, { useEffect, useState } from 'react';


const coursesData = {
  departmentElectives: [
    "Elective Course 1",
    "Elective Course 2",
    "Elective Course 3"
  ],
  departmentCore: [
    "Core Course 1",
    "Core Course 2",
    "Core Course 3"
  ],
  firstYearCourses: [
    "First Year Course 1",
    "First Year Course 2",
    "First Year Course 3"
  ]
};



function Courses() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-2">Courses</h2>
      {Object.entries(coursesData).map(([category, courses], index) => (
        <div key={category}>
          <button 
            className="w-full text-left p-2 font-semibold bg-gray-200 rounded focus:outline-none" 
            onClick={() => toggleAccordion(index)}
          >
            {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </button>
          {openIndex === index && (
            <ul className="p-2">
              {courses.map((course, i) => (
                <li key={i} className="py-1">{course}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Courses;