// src/HomePage.js
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import useGetUserInfo from '../../hooks/useGetUserInfo';

// Updated data structure for courses
const coursesData = {
  incompleteCourses: {
    DC: [
      { courseCode: "ECL252", courseName: "Analog Circuits", LTP: "3-0-0", credits: 3, completed: false },
      { courseCode: "ECP252", courseName: "Analog Circuits Lab", LTP: "0-0-2", credits: 1, completed: false },
      // ... other courses
    ],
    DE: [
      { courseCode: "ECL461", courseName: "Wireless Communications", LTP: "3-0-0", credits: 3, completed: false },
      { courseCode: "ECP461", courseName: "Wireless Communications Lab", LTP: "0-0-2", credits: 1, completed: false },
      // ... other courses
    ],
    FirstYearCourses: {
      HM: [
        { courseCode: "HML151", courseName: "Social Science", LTP: "2-0-0", credits: 2, completed: false },
        // ... other courses
      ],
      BS: [
        { courseCode: "SCL152", courseName: "Applied Mathematics-I", LTP: "3-2-0", credits: 4, completed: false },
        // ... other courses
      ],
      UN: [
        { courseCode: "UNL101", courseName: "Universal Knowledge", LTP: "2-0-0", credits: 2, completed: false },
        // ... other courses
      ],
    }
  }
};
const studentData = {
  name: "John Doe",
  idnumber: "ST123456",
  rollNo: "CS2023001",
  guardian: "Jane Doe",
  guardianAddress: "123 Main St, Springfield, ",
  guardianMobile: "123-456-7890",
  guardianEmail: "jane.doe@example.com",
  studentAddress: "456 College Rd, Srinagar Garhwal, Uttarakhand, India",
  studentMobile: "987-654-3210",
  studentEmail: "john.doe@example.com",
  creditsCompleted: "60"
};


const HomePage = () => {
  let handleUserInfo = useGetUserInfo();

  useEffect(() => { handleUserInfo() }, [])

  const [semester, setSemester] = useState("");
  const [selectedCourses, setSelectedCourses] = useState({});
  const [openAccordions, setOpenAccordions] = useState([]); // Changed to an array

  const handleCheckboxChange = (category, course) => {
    setSelectedCourses(prevState => {
      const isSelected = prevState[category]?.includes(course) || false;
      return {
        ...prevState,
        [category]: isSelected
          ? prevState[category].filter(c => c !== course)
          : [...(prevState[category] || []), course]
      };
    });
  };

  const toggleAccordion = (category) => {
    setOpenAccordions(prev => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category); // Close the accordion
      } else {
        return [...prev, category]; // Open the accordion
      }
    });
  };

  const generatePDF = () => {
    if (!semester) {
      alert("Please enter your semester.");
      return;
    }

    const selectedCoursesCount = Object.values(selectedCourses).flat().length;
    if (selectedCoursesCount === 0) {
      alert("Please select at least one course.");
      return;
    }

    const doc = new jsPDF();

    // Centered Title
    doc.setFontSize(16);
    doc.text("NATIONAL INSTITUTE OF TECHNOLOGY, UTTARAKHAND", doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    // Registration Form
    doc.setFontSize(14);
    doc.text("Registration Form", doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

    // Semester Info
    doc.setFontSize(12);
    doc.text("Even Semester-2024", doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    doc.text("(To be filled in triplicate)", doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });
    doc.text("IV/VI/VIII/X/XII Semester B.Tech. (CE/CS/EC/EE/ME)", doc.internal.pageSize.getWidth() /  2, 40, { align: 'center' });

    // Student Information
    doc.setFontSize(12);
    const leftMargin = 10; // Reduced left margin for text
    const studentInfoStartY = 55; // Starting Y position for student info
    const verticalGap = 7; // Vertical gap to add

    // Adjusted Y positions for student information
    doc.text(`Name of Student: ${studentData.name}`, leftMargin, studentInfoStartY);
    doc.text(`No.: ${studentData.idnumber}  Roll No.: ${studentData.rollNo}`, leftMargin, studentInfoStartY + verticalGap);
    doc.text(`Name of Father/Mother/Guardian: ${studentData.guardian}`, leftMargin, studentInfoStartY + verticalGap * 2);
    doc.text(`Present address for correspondence with the Father/Mother/Guardian: ${studentData.guardianAddress}`, leftMargin, studentInfoStartY + verticalGap * 3);

    // Placeholder for Guardian's Mobile and Email
    doc.text(`Landline/Mobile No. of Father/Mother/Guardian: ${studentData.guardianMobile}`, leftMargin, studentInfoStartY + verticalGap * 4);
    doc.text(`Email ID: ${studentData.guardianEmail}`, leftMargin, studentInfoStartY + verticalGap * 5);

    // Student's Address and Contact
    doc.text(`Student’s address in Srinagar Garhwal: ${studentData.studentAddress}`, leftMargin, studentInfoStartY + verticalGap * 6);
    doc.text(`Mobile No. of Student: ${studentData.studentMobile}`, leftMargin, studentInfoStartY + verticalGap * 7);
    doc.text(`Email: ${studentData.studentEmail}`, leftMargin, studentInfoStartY + verticalGap * 8);

    // Credits Completed
    doc.text(`Credits Completed: ${studentData.creditsCompleted}`, leftMargin, studentInfoStartY + verticalGap * 9);

    // Courses Table Header
    doc.text("May kindly be allowed to register for the following courses:", leftMargin, studentInfoStartY + verticalGap * 10);

    // Prepare data for the courses table
    const tableData = [];
    Object.keys(selectedCourses).forEach(category => {
      selectedCourses[category].forEach(course => {
        tableData.push({
          CourseCode: course.courseCode,
          CourseTitle: course.courseName,
          Slot: "A", // Placeholder for Slot
          LTP: course.LTP,
          Type: "DE", // Placeholder for Type
          Credits: course.credits,
          Remarks: ""
        });
      });
    });

    // Add a table for selected courses
    doc.autoTable({
      head: [['Sr. No.', 'Course Code', 'Course Title', 'Slot', 'Structure L-T-P', 'DC/DE/OC/AU/HM/UN/BS/ES', 'Credits', 'Remarks']],
      body: tableData.map((item, index) => [
        index + 1,
        item.CourseCode,
        item.CourseTitle,
        item.Slot,
        item.LTP,
        item.Type,
        item.Credits,
        item.Remarks,
      ]),
      startY: studentInfoStartY + verticalGap * 11, // Adjusted start position for the table
      theme: 'grid',
      styles: {
        fontSize: 12,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      columnStyles: {
        0: { cellWidth: 10 }, // Sr. No.
        1: { cellWidth: 25 }, // Course Code
        2: { cellWidth: 63 }, // Course Title
        3: { cellWidth: 12 }, // Slot
        4: { cellWidth: 25 }, // Structure L-T-P
        5: { cellWidth: 20 }, // DC/DE/OC/AU/HM/UN/BS/ES
        6: { cellWidth: 25 }, // Credits
        7: { cellWidth: 22 }, // Remarks
      },
      margin: { top: 10, left: 5 }, // Reduced left margin for the table
    });

    // Total Credits
    const totalCredits = tableData.reduce((sum, course) => sum + course.Credits, 0);
    doc.text(`Total Credits: ${totalCredits}`, leftMargin, doc.autoTable.previous.finalY + 10);

    // Signature
    doc.text("Signature of Student: ______________________________________", doc.internal.pageSize.getWidth() - 100, doc.autoTable.previous.finalY + 15, { align: 'right' });
    doc.text("Approved/Not Approved: __________________________________ ____", doc.internal.pageSize.getWidth() /  2, doc.autoTable.previous.finalY + 20, { align: 'center' });

    // Save the PDF
    doc.save("registration_form.pdf");
    alert("PDF generated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome, {studentData.name}</h1>

      {/* Semester Input Field */}
      <div className="mb-4">
        <label htmlFor="semester" className="block text-lg font-semibold mb-1">Enter Your Semester:</label>
        <input
          type="text"
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 1st Semester"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Select Your Courses</h2>

      {Object.keys(coursesData.incompleteCourses).map(category => (
        <div key={category} className="mb -4">
          <h3 className="text-lg font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)} Courses</h3>
          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${openAccordions.includes(category) ? 'bg-orange-700' : ''}`}
            onClick={() => toggleAccordion(category)}
          >
            {openAccordions.includes(category) ? 'Collapse' : 'Expand'}
          </button>
          {openAccordions.includes(category) && (
            <div>
              {coursesData.incompleteCourses[category].map(course => (
                <div key={course.courseCode} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={course.courseCode}
                    onChange={() => handleCheckboxChange(category, course)}
                    className="mr-2"
                  />
                  <label htmlFor={course.courseCode}>
                    {course.courseCode} - {course.courseName} ({course.LTP}) - {course.credits} credits
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {Object.keys(coursesData.incompleteCourses.FirstYearCourses).map(category => (
        <div key={category} className="mb-4">
          <h3 className="text-lg font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)} Courses</h3>
          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${openAccordions.includes(category) ? 'bg-orange-700' : ''}`}
            onClick={() => toggleAccordion(category)}
          >
            {openAccordions.includes(category) ? 'Collapse' : 'Expand'}
          </button>
          {openAccordions.includes(category) && (
            <div>
              {coursesData.incompleteCourses.FirstYearCourses[category].map(course => (
                <div key={course.courseCode} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={course.courseCode}
                    onChange={() => handleCheckboxChange(category, course)}
                    className="mr-2"
                  />
                  <label htmlFor={course.courseCode}>
                    {course.courseCode} - {course.courseName} ({course.LTP}) - {course.credits} credits
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Generate PDF Button */}
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={generatePDF}
      >
        Generate PDF
      </button>
    </div>
  );
};




export default HomePage;

