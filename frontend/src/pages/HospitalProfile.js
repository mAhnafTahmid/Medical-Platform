import React, { useState, useEffect } from 'react';


const HospitalProfile = () => {
  const [hospitalDetails, setHospitalDetails] = useState({
    name: '',
    phoneNumber: '',
    city: '',
    area: '',
    houseNo: '',
    roadNo: '',
    laneNo: '',
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const mail = 'info@newhospital.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3055/hospital/${mail}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setHospitalDetails({
            name: data.name,
            phoneNumber: data.phoneNo,
            city: data.city,
            area: data.area,
            houseNo: data.houseNo,
            roadNo: data.roadNo,
            laneNo: data.laneNo,
          });
          setAnnouncements(data.announcements);
  
          const departmentArray = [];
          for (const departmentName in data.departments) {
            if (data.departments.hasOwnProperty(departmentName)) {
              departmentArray.push({
                name: departmentName,
                doctors: data.departments[departmentName],
              });
            }
          }
          setDepartments(departmentArray);
  
          setName(data.name);
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [mail]);
  

  const handleAcceptRequest = async (requestId) => {
    try {
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleAddAnnouncement = async () => {
    const data = {
      email: mail,
      announcements: newAnnouncement,
    };
    try {
      const response = await fetch(`http://localhost:3055/hospital`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      setAnnouncements(newData.announcements);
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (announcementDate) => {
    const data = {
      email: mail,
      announcementDate: announcementDate,
    };
    try {
      const response = await fetch(`http://localhost:3055/hospital`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      setAnnouncements(newData.announcements);
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleDeleteDoctor = async (doctorName, name) => {
    const data = {
      hospitalName: hospitalDetails.name,
      departmentName: name,
      doctorName: doctorName
    };
    try {
      const response = await fetch(`http://localhost:3055/doctor`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const newData = await response.json();
      const departmentArray = [];
      for (const departmentName in newData.departments) {
        if (newData.departments.hasOwnProperty(departmentName)) {
          departmentArray.push({
            name: departmentName,
            doctors: newData.departments[departmentName],
          });
        }
      }
      setDepartments(departmentArray);
    } catch (error) {
      console.error('Error removing doctor:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      {!loading && (
        <div>
          <h1 className="text-3xl font-bold mb-8">Hospital Profile</h1>
          <div className="border-b-2 border-t-2 pb-4 pt-4">
            <h1 className="text-3xl font-bold pb-4">{hospitalDetails.name}</h1>
            <div className="flex justify-between">
              <p>Email: {mail}</p>
              <p>Phone: {hospitalDetails.phoneNumber}</p>
              <p>
                Location:{' '}
                {`${hospitalDetails.area}, ${hospitalDetails.city}, House:${hospitalDetails.houseNo}, Road:${hospitalDetails.roadNo}, Lane:${hospitalDetails.laneNo}`}
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <div className="w-1/3 pr-4 border-r-2">
              <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <div key={request.id} className="mb-4">
                    <p>{request.details}</p>
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                ))
              ) : (
                <p>No pending requests</p>
              )}
            </div>
            <div className="w-2/3 pl-4 pr-8">
              <h2 className="text-2xl font-semibold mb-4">Departments</h2>
              <div className="grid grid-cols-1 gap-4">
                {departments.map((department, index) => (
                  <div key={index} className="border border-black rounded p-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">{department.name}</h3>
                    {department.doctors.map((doctor, idx) => (
                      <div key={idx} className="flex justify-between items-center mb-2 border border-black rounded">
                        <span>{doctor.name}</span>
                        <button
                          onClick={() => handleDeleteDoctor(doctor.name, department.name)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/3 pl-4 border-l-2">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Make Announcement</h2>
                <textarea
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  className="w-full h-32 border border-gray-300 rounded p-2"
                ></textarea>
                <button onClick={handleAddAnnouncement} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700">
                  Add
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
                {announcements && announcements.length !== 0 ? (
                  announcements.map((announcement) => (
                    <div key={announcement[0]} className="mb-4 border-2 rounded-lg border-black">
                      <p>{announcement[1]}</p>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement[0])}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No announcements</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalProfile;
