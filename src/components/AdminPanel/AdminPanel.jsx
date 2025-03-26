import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, query, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; 
import { 
  FaUserPlus, FaRegUser, FaUsers, FaClipboard, FaTrash, FaUserTie, 
  FaUserGraduate, FaEdit, FaFilter, FaBars, FaTimes, FaPlus, FaGlobe,
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaLink,
  FaSchool, FaGraduationCap, FaChalkboardTeacher, FaBook, FaIdCard,
  FaCalendarAlt, FaChartBar, FaUniversity, FaImage, FaVideo
} from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

const db = getFirestore();
const auth = getAuth();

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedView, setSelectedView] = useState("dashboard"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [newPost, setNewPost] = useState({ 
    title: "", 
    content: "",
    imageUrl: "",
    videoUrl: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      other: ""
    },
    createdAt: new Date()
  });
  const [newWebsite, setNewWebsite] = useState({ 
    name: "", 
    url: "",
    description: "",
    category: "official"
  });
  const [newProgram, setNewProgram] = useState({
    name: "",
    type: "degree",
    description: "",
    duration: "",
    requirements: "",
    fee: ""
  });
  const [filters, setFilters] = useState({
    program: "",
    gender: "",
    educationLevel: ""
  });
  const navigate = useNavigate();

  // Analytics Data
  const analyticsData = {
    monthlyStudents: [
      { month: "Jan", students: 10 },
      { month: "Feb", students: 15 },
      { month: "Mar", students: 20 },
      { month: "Apr", students: 25 },
      { month: "May", students: 30 },
      { month: "Jun", students: 35 },
    ],
    yearlyStudents: [
      { year: "2020", students: 100 },
      { year: "2021", students: 150 },
      { year: "2022", students: 200 },
    ],
    programDistribution: programs.map(program => ({
      name: program.name,
      students: students.filter(s => s.program === program.name).length
    }))
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role);

        if (userData.role !== "admin") {
          navigate("/");
          return;
        }
      } else {
        navigate("/");
        return;
      }
    };

    fetchUserRole();
  }, [navigate]);

  useEffect(() => {
    if (userRole !== "admin") return;

    const fetchData = () => {
      const usersRef = collection(db, "users");
      const postsRef = collection(db, "posts");
      const programsRef = collection(db, "programs");
      const websitesRef = collection(db, "websites");

      const usersQuery = query(usersRef);
      const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
        setAdmins(userData.filter(user => user.role === "admin"));
        setStudents(userData.filter(user => user.role === "student"));
        setTeachers(userData.filter(user => user.role === "teacher"));
        setCustomers(userData.filter(user => user.role === "customer"));
      });

      const unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
        setPosts(querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          socialLinks: doc.data().socialLinks || {
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            linkedin: "",
            other: ""
          },
          imageUrl: doc.data().imageUrl || "",
          videoUrl: doc.data().videoUrl || ""
        })));
      });

      const unsubscribePrograms = onSnapshot(programsRef, (querySnapshot) => {
        setPrograms(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      const unsubscribeWebsites = onSnapshot(websitesRef, (querySnapshot) => {
        setWebsites(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubscribeUsers();
        unsubscribePosts();
        unsubscribePrograms();
        unsubscribeWebsites();
      };
    };

    fetchData();
  }, [userRole]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/"); 
      })
      .catch((error) => {
        toast.error("Error logging out: " + error.message);
      });
  };

  const handleDelete = async (id, type) => {
    const ref = type === 'user' ? "users" : 
                type === 'post' ? "posts" : 
                type === 'website' ? "websites" : 
                type === 'program' ? "programs" : "users";
    try {
      await deleteDoc(doc(db, ref, id));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
      setDeleteConfirmation(null);
    } catch (error) {
      toast.error(`Error deleting ${type}: ` + error.message);
    }
  };

  const handleAddPost = async () => {
    try {
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        ...newPost,
        createdAt: new Date()
      });
      toast.success("Post added successfully!");
      setNewPost({ 
        title: "", 
        content: "",
        imageUrl: "",
        videoUrl: "",
        socialLinks: {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          linkedin: "",
          other: ""
        }
      });
      setShowAddForm(false);
    } catch (error) {
      toast.error("Error adding post: " + error.message);
    }
  };

  const handleAddWebsite = async () => {
    try {
      const websitesRef = collection(db, "websites");
      await addDoc(websitesRef, newWebsite);
      toast.success("Website added successfully!");
      setNewWebsite({ 
        name: "", 
        url: "",
        description: "",
        category: "official"
      });
      setShowAddForm(false);
    } catch (error) {
      toast.error("Error adding website: " + error.message);
    }
  };

  const handleAddProgram = async () => {
    try {
      const programsRef = collection(db, "programs");
      await addDoc(programsRef, newProgram);
      toast.success("Program added successfully!");
      setNewProgram({
        name: "",
        type: "degree",
        description: "",
        duration: "",
        requirements: "",
        fee: ""
      });
      setShowAddForm(false);
    } catch (error) {
      toast.error("Error adding program: " + error.message);
    }
  };

  const handleEditItem = async (itemData, type) => {
    try {
      const ref = type === 'user' ? "users" : 
                  type === 'post' ? "posts" : 
                  type === 'website' ? "websites" : 
                  type === 'program' ? "programs" : "users";
      const itemRef = doc(db, ref, itemData.id);
      await updateDoc(itemRef, itemData);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
      setEditItem(null);
    } catch (error) {
      toast.error("Error updating item: " + error.message);
    }
  };

  const SidebarButton = ({ view, icon, label }) => (
    <button 
      onClick={() => {
        setSelectedView(view);
        setSelectedProgram(null);
        setIsSidebarOpen(false);
      }} 
      className={`flex items-center p-3 hover:bg-blue-700 rounded capitalize ${selectedView === view ? 'bg-blue-700' : ''}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );

  const handleAddUser = async (userData) => {
    try {
      const usersRef = collection(db, "users");
      await addDoc(usersRef, userData);
      toast.success("User added successfully!");
      setShowAddForm(false);
    } catch (error) {
      toast.error("Error adding user: " + error.message);
    }
  };

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setSelectedView("students");
  };

  const handleSocialLinkChange = (platform, value) => {
    setNewPost(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleEditSocialLinkChange = (platform, value) => {
    setEditItem(prev => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          linkedin: "",
          other: ""
        }),
        [platform]: value
      }
    }));
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const filteredStudents = students.filter(student => {
    return (
      (filters.program === "" || student.program === filters.program) &&
      (filters.gender === "" || student.gender === filters.gender) &&
      (filters.educationLevel === "" || student.educationLevel === filters.educationLevel)
    );
  });

  if (userRole !== "admin") {
    return null;
  }

  const renderTable = (data, type) => {
    if (!data || data.length === 0) {
      return <p className="text-gray-500 p-4">No {type} found</p>;
    }

    const columns = type === 'users' || type === 'admins' || type === 'students' || type === 'teachers' || type === 'customers' ? [
      { header: 'ID', key: 'id' },
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Role', key: 'role' },
      ...(type === 'students' ? [
        { header: 'Program', key: 'program' },
        { header: 'Grade', key: 'grade' },
        { header: 'Score', key: 'score' }
      ] : []),
      { header: 'Phone', key: 'phone' },
      { header: 'Gender', key: 'gender' },
      { header: 'Actions', key: 'actions' }
    ] : type === 'posts' ? [
      { header: 'Title', key: 'title' },
      { header: 'Content', key: 'content' },
      { header: 'Media', key: 'media' },
      { header: 'Social Links', key: 'socialLinks' },
      { header: 'Actions', key: 'actions' }
    ] : type === 'websites' ? [
      { header: 'Name', key: 'name' },
      { header: 'URL', key: 'url' },
      { header: 'Category', key: 'category' },
      { header: 'Actions', key: 'actions' }
    ] : type === 'programs' ? [
      { header: 'Name', key: 'name' },
      { header: 'Type', key: 'type' },
      { header: 'Duration', key: 'duration' },
      { header: 'Fee', key: 'fee' },
      { header: 'Actions', key: 'actions' }
    ] : [];

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="py-2 px-4 text-left">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map(column => {
                  if (column.key === 'actions') {
                    return (
                      <td key={`${item.id}-actions`} className="py-2 px-4 flex space-x-2">
                        <button 
                          onClick={() => setEditItem({ ...item, type: type.slice(0, -1) })}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmation({ type: type.slice(0, -1), id: item.id })}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    );
                  } else if (column.key === 'socialLinks') {
                    const socialLinks = item.socialLinks || {
                      facebook: "",
                      twitter: "",
                      instagram: "",
                      youtube: "",
                      linkedin: "",
                      other: ""
                    };
                    return (
                      <td key={`${item.id}-socialLinks`} className="py-2 px-4">
                        <div className="flex space-x-2">
                          {socialLinks.facebook && (
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                              <FaFacebook />
                            </a>
                          )}
                          {socialLinks.twitter && (
                            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                              <FaTwitter />
                            </a>
                          )}
                          {socialLinks.instagram && (
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                              <FaInstagram />
                            </a>
                          )}
                          {socialLinks.youtube && (
                            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                              <FaYoutube />
                            </a>
                          )}
                          {socialLinks.linkedin && (
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                              <FaLinkedin />
                            </a>
                          )}
                          {socialLinks.other && (
                            <a href={socialLinks.other} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
                              <FaLink />
                            </a>
                          )}
                        </div>
                      </td>
                    );
                  } else if (column.key === 'media') {
                    return (
                      <td key={`${item.id}-media`} className="py-2 px-4">
                        <div className="flex space-x-2">
                          {item.imageUrl && (
                            <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                              <FaImage />
                            </a>
                          )}
                          {item.videoUrl && (
                            <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                              <FaVideo />
                            </a>
                          )}
                        </div>
                      </td>
                    );
                  } else if (column.key === 'id') {
                    return (
                      <td key={`${item.id}-${column.key}`} className="py-2 px-4 text-xs text-gray-500">
                        {item.id.substring(0, 8)}...
                      </td>
                    );
                  }
                  return (
                    <td key={`${item.id}-${column.key}`} className="py-2 px-4">
                      {item[column.key] || '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderProgramCards = () => {
    const programGroups = {};
    
    programs.forEach(program => {
      if (!programGroups[program.type]) {
        programGroups[program.type] = [];
      }
      programGroups[program.type].push(program);
    });

    return Object.entries(programGroups).map(([type, programs]) => (
      <div key={type} className="mb-8">
        <h3 className="text-xl font-semibold text-blue-950 mb-4 capitalize">
          {type} Programs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map(program => {
            const studentCount = students.filter(student => student.program === program.name).length;
            return (
              <div 
                key={program.id} 
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProgramClick(program.name)}
              >
                <div className="flex items-center mb-2">
                  {type === 'degree' ? (
                    <FaGraduationCap className="text-blue-600 mr-2 text-xl" />
                  ) : type === 'tvet' ? (
                    <FaSchool className="text-green-600 mr-2 text-xl" />
                  ) : (
                    <FaBook className="text-purple-600 mr-2 text-xl" />
                  )}
                  <h4 className="text-lg font-semibold text-blue-950">{program.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-1">Duration: {program.duration}</p>
                <p className="text-sm text-gray-600 mb-1">Fee: {program.fee || 'N/A'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Students: {studentCount}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditItem({ ...program, type: 'program' });
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmation({ type: 'program', id: program.id });
                      }}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden bg-blue-950 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">College Admin Panel</h2>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`lg:w-64 bg-blue-950 text-white p-6 flex flex-col fixed lg:static inset-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <h2 className="text-xl font-bold mb-6 hidden lg:block">College Admin</h2>
        <div className="space-y-4 overflow-y-auto flex-1">
          <SidebarButton view="dashboard" icon={<FaClipboard />} label="Dashboard" />
          
          <div className="mt-4">
            <h3 className="text-sm uppercase font-semibold text-blue-300 mb-2">Users</h3>
            <div className="space-y-2 pl-2">
              <SidebarButton view="users" icon={<FaUsers />} label="All Users" />
              <SidebarButton view="admins" icon={<FaUserTie />} label="Admins" />
              <SidebarButton view="students" icon={<FaUserGraduate />} label="Students" />
              <SidebarButton view="teachers" icon={<FaChalkboardTeacher />} label="Teachers" />
              <SidebarButton view="customers" icon={<FaUserPlus />} label="Customers" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm uppercase font-semibold text-blue-300 mb-2">Academics</h3>
            <div className="space-y-2 pl-2">
              <SidebarButton view="programs" icon={<FaBook />} label="Programs" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm uppercase font-semibold text-blue-300 mb-2">Content</h3>
            <div className="space-y-2 pl-2">
              <SidebarButton view="posts" icon={<FaClipboard />} label="Posts" />
              <SidebarButton view="websites" icon={<FaGlobe />} label="Websites" />
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className="p-3 hover:bg-blue-700 rounded text-white flex items-center mt-auto"
          >
            <FaRegUser className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 overflow-auto lg:ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-blue-950 capitalize">
            {selectedView === 'dashboard' ? 'Dashboard' : 
             selectedView === 'students' && selectedProgram ? `${selectedProgram} Students` : 
             selectedView}
          </h2>
          {selectedView !== 'dashboard' && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <FaPlus className="mr-2" />
              Add {selectedView === 'students' ? 'Student' : selectedView.slice(0, -1)}
            </button>
          )}
        </div>

        {/* Dashboard View */}
        {selectedView === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Users', count: users.length, view: 'users', icon: <FaUsers size={24} className="text-blue-500" /> },
                { label: 'Admins', count: admins.length, view: 'admins', icon: <FaUserTie size={24} className="text-purple-500" /> },
                { label: 'Students', count: students.length, view: 'students', icon: <FaUserGraduate size={24} className="text-green-500" /> },
                { label: 'Teachers', count: teachers.length, view: 'teachers', icon: <FaChalkboardTeacher size={24} className="text-yellow-500" /> },
                { label: 'Customers', count: customers.length, view: 'customers', icon: <FaUserPlus size={24} className="text-red-500" /> },
                { label: 'Programs', count: programs.length, view: 'programs', icon: <FaBook size={24} className="text-orange-500" /> },
                { label: 'Degree Programs', count: programs.filter(p => p.type === 'degree').length, view: 'programs', icon: <FaUniversity size={24} className="text-indigo-500" /> },
                { label: 'TVET Programs', count: programs.filter(p => p.type === 'tvet').length, view: 'programs', icon: <FaSchool size={24} className="text-teal-500" /> },
              ].map(({ label, count, view, icon }) => (
                <div 
                  key={label} 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
                  onClick={() => setSelectedView(view)}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
                    <p className="text-2xl font-bold text-blue-950">{count}</p>
                  </div>
                  <div>{icon}</div>
                </div>
              ))}
            </div>

            {/* Program Cards */}
            {renderProgramCards()}

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-blue-950 mb-4">Monthly Students</h3>
                <div className="overflow-x-auto">
                  <LineChart width={500} height={300} data={analyticsData.monthlyStudents}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-blue-950 mb-4">Program Distribution</h3>
                <div className="overflow-x-auto">
                  <BarChart width={500} height={300} data={analyticsData.programDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users View */}
        {["users", "admins", "teachers", "customers"].includes(selectedView) && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">
              {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
            </h3>
            {renderTable(
              selectedView === 'admins' ? admins :
              selectedView === 'teachers' ? teachers :
              selectedView === 'customers' ? customers :
              users,
              'users'
            )}
          </div>
        )}

        {/* Students View */}
        {selectedView === "students" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-950">
                {selectedProgram ? `${selectedProgram} Students` : 'All Students'}
              </h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    value={filters.program}
                    onChange={(e) => handleFilterChange('program', e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Programs</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <FaFilter className="absolute right-3 top-3 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <FaFilter className="absolute right-3 top-3 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    value={filters.educationLevel}
                    onChange={(e) => handleFilterChange('educationLevel', e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Levels</option>
                    <option value="completedSchool">Completed School</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade12">Grade 12</option>
                  </select>
                  <FaFilter className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
            {renderTable(
              selectedProgram ? 
                filteredStudents.filter(student => student.program === selectedProgram) : 
                filteredStudents,
              'students'
            )}
          </div>
        )}

        {/* Posts View */}
        {selectedView === "posts" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">Posts</h3>
            {renderTable(posts, 'posts')}
          </div>
        )}

        {/* Programs View */}
        {selectedView === "programs" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">Programs</h3>
            {renderTable(programs, 'programs')}
          </div>
        )}

        {/* Websites View */}
        {selectedView === "websites" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">Websites</h3>
            {renderTable(websites, 'websites')}
          </div>
        )}

        {/* Add Forms */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">
                Add {selectedView === 'students' ? 'Student' : selectedView.slice(0, -1)}
              </h3>
              
              {selectedView === "posts" && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Title</label>
                    <input 
                      type="text" 
                      value={newPost.title} 
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Content</label>
                    <textarea 
                      value={newPost.content} 
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="4"
                      placeholder="Enter post content"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Image URL</label>
                    <input 
                      type="url" 
                      value={newPost.imageUrl} 
                      onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Video URL</label>
                    <input 
                      type="url" 
                      value={newPost.videoUrl} 
                      onChange={(e) => setNewPost({...newPost, videoUrl: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter video URL"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Social Links</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FaFacebook className="text-blue-600 mr-2" />
                        <input 
                          type="url" 
                          value={newPost.socialLinks.facebook} 
                          onChange={(e) => handleSocialLinkChange('facebook', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Facebook URL"
                        />
                      </div>
                      <div className="flex items-center">
                        <FaTwitter className="text-blue-400 mr-2" />
                        <input 
                          type="url" 
                          value={newPost.socialLinks.twitter} 
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Twitter URL"
                        />
                      </div>
                      <div className="flex items-center">
                        <FaInstagram className="text-pink-600 mr-2" />
                        <input 
                          type="url" 
                          value={newPost.socialLinks.instagram} 
                          onChange={(e) => handleSocialLinkChange('instagram', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Instagram URL"
                        />
                      </div>
                      <div className="flex items-center">
                        <FaYoutube className="text-red-600 mr-2" />
                        <input 
                          type="url" 
                          value={newPost.socialLinks.youtube} 
                          onChange={(e) => handleSocialLinkChange('youtube', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="YouTube URL"
                        />
                      </div>
                      <div className="flex items-center">
                        <FaLinkedin className="text-blue-700 mr-2" />
                        <input 
                          type="url" 
                          value={newPost.socialLinks.linkedin} 
                          onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="LinkedIn URL"
                        />
                      </div>
                      <div className="flex items-center">
                        <FaLink className="text-gray-600 mr-2" />
                        <input 
                          type="url" 
                          value={newPost.socialLinks.other} 
                          onChange={(e) => handleSocialLinkChange('other', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Other URL"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={handleAddPost} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add Post
                    </button>
                    <button 
                      onClick={() => setShowAddForm(false)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {selectedView === "websites" && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Website Name</label>
                    <input 
                      type="text" 
                      value={newWebsite.name} 
                      onChange={(e) => setNewWebsite({...newWebsite, name: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter website name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">URL</label>
                    <input 
                      type="url" 
                      value={newWebsite.url} 
                      onChange={(e) => setNewWebsite({...newWebsite, url: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter website URL"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea 
                      value={newWebsite.description} 
                      onChange={(e) => setNewWebsite({...newWebsite, description: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3"
                      placeholder="Enter website description"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Category</label>
                    <select 
                      value={newWebsite.category} 
                      onChange={(e) => setNewWebsite({...newWebsite, category: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="official">Official</option>
                      <option value="resource">Resource</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={handleAddWebsite} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add Website
                    </button>
                    <button 
                      onClick={() => setShowAddForm(false)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {selectedView === "programs" && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Program Name</label>
                    <input 
                      type="text" 
                      value={newProgram.name} 
                      onChange={(e) => setNewProgram({...newProgram, name: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter program name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Program Type</label>
                    <select 
                      value={newProgram.type} 
                      onChange={(e) => setNewProgram({...newProgram, type: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="degree">Degree</option>
                      <option value="tvet">TVET</option>
                      <option value="certificate">Certificate</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Duration</label>
                    <input 
                      type="text" 
                      value={newProgram.duration} 
                      onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="e.g., 4 years"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Fee</label>
                    <input 
                      type="text" 
                      value={newProgram.fee} 
                      onChange={(e) => setNewProgram({...newProgram, fee: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="e.g., $5000/year"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Requirements</label>
                    <textarea 
                      value={newProgram.requirements} 
                      onChange={(e) => setNewProgram({...newProgram, requirements: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3"
                      placeholder="Enter admission requirements"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea 
                      value={newProgram.description} 
                      onChange={(e) => setNewProgram({...newProgram, description: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3"
                      placeholder="Enter program description"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={handleAddProgram} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add Program
                    </button>
                    <button 
                      onClick={() => setShowAddForm(false)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {["users", "admins", "students", "teachers", "customers"].includes(selectedView) && (
                <StudentRegistrationForm 
                  onAddUser={handleAddUser} 
                  onCancel={() => setShowAddForm(false)}
                  defaultRole={selectedView === 'students' ? 'student' : selectedView.slice(0, -1)}
                  programs={programs}
                />
              )}
            </div>
          </div>
        )}

        {/* Edit Forms */}
        {editItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Edit {editItem.type}</h3>
              
              {editItem.type === 'user' && (
                <EditStudentForm 
                  user={editItem} 
                  onEditUser={(data) => handleEditItem(data, 'user')} 
                  onCancel={() => setEditItem(null)} 
                  programs={programs}
                />
              )}

              {editItem.type === 'post' && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Title</label>
                    <input 
                      type="text" 
                      value={editItem.title} 
                      onChange={(e) => setEditItem({...editItem, title: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Content</label>
                    <textarea 
                      value={editItem.content} 
                      onChange={(e) => setEditItem({...editItem, content: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="4"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Image URL</label>
                    <input 
                      type="url" 
                      value={editItem.imageUrl} 
                      onChange={(e) => setEditItem({...editItem, imageUrl: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Video URL</label>
                    <input 
                      type="url" 
                      value={editItem.videoUrl} 
                      onChange={(e) => setEditItem({...editItem, videoUrl: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Social Links</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FaFacebook className="text-blue-600 mr-2" />
                        <input 
                          type="url" 
                          value={editItem.socialLinks?.facebook || ""} 
                          onChange={(e) => handleEditSocialLinkChange('facebook', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="flex items-center">
                        <FaTwitter className="text-blue-400 mr-2" />
                        <input 
                          type="url" 
                          value={editItem.socialLinks?.twitter || ""} 
                          onChange={(e) => handleEditSocialLinkChange('twitter', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="flex items-center">
                        <FaInstagram className="text-pink-600 mr-2" />
                        <input 
                          type="url" 
                          value={editItem.socialLinks?.instagram || ""} 
                          onChange={(e) => handleEditSocialLinkChange('instagram', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="flex items-center">
                        <FaYoutube className="text-red-600 mr-2" />
                        <input 
                          type="url" 
                          value={editItem.socialLinks?.youtube || ""} 
                          onChange={(e) => handleEditSocialLinkChange('youtube', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="flex items-center">
                        <FaLinkedin className="text-blue-700 mr-2" />
                        <input 
                          type="url" 
                          value={editItem.socialLinks?.linkedin || ""} 
                          onChange={(e) => handleEditSocialLinkChange('linkedin', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="flex items-center">
                        <FaLink className="text-gray-600 mr-2" />
                        <input 
                          type="url" 
                          value={editItem.socialLinks?.other || ""} 
                          onChange={(e) => handleEditSocialLinkChange('other', e.target.value)} 
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => handleEditItem(editItem, 'post')} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
                    >
                      <FaEdit className="mr-2" />
                      Update Post
                    </button>
                    <button 
                      onClick={() => setEditItem(null)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {editItem.type === 'website' && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Website Name</label>
                    <input 
                      type="text" 
                      value={editItem.name} 
                      onChange={(e) => setEditItem({...editItem, name: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">URL</label>
                    <input 
                      type="url" 
                      value={editItem.url} 
                      onChange={(e) => setEditItem({...editItem, url: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea 
                      value={editItem.description} 
                      onChange={(e) => setEditItem({...editItem, description: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Category</label>
                    <select 
                      value={editItem.category} 
                      onChange={(e) => setEditItem({...editItem, category: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="official">Official</option>
                      <option value="resource">Resource</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => handleEditItem(editItem, 'website')} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
                    >
                      <FaEdit className="mr-2" />
                      Update Website
                    </button>
                    <button 
                      onClick={() => setEditItem(null)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {editItem.type === 'program' && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Program Name</label>
                    <input 
                      type="text" 
                      value={editItem.name} 
                      onChange={(e) => setEditItem({...editItem, name: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Program Type</label>
                    <select 
                      value={editItem.type} 
                      onChange={(e) => setEditItem({...editItem, type: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="degree">Degree</option>
                      <option value="tvet">TVET</option>
                      <option value="certificate">Certificate</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Duration</label>
                    <input 
                      type="text" 
                      value={editItem.duration} 
                      onChange={(e) => setEditItem({...editItem, duration: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Fee</label>
                    <input 
                      type="text" 
                      value={editItem.fee} 
                      onChange={(e) => setEditItem({...editItem, fee: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Requirements</label>
                    <textarea 
                      value={editItem.requirements} 
                      onChange={(e) => setEditItem({...editItem, requirements: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea 
                      value={editItem.description} 
                      onChange={(e) => setEditItem({...editItem, description: e.target.value})} 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => handleEditItem(editItem, 'program')} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
                    >
                      <FaEdit className="mr-2" />
                      Update Program
                    </button>
                    <button 
                      onClick={() => setEditItem(null)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this {deleteConfirmation.type}?</p>
              <div className="flex justify-between">
                <button 
                  onClick={() => handleDelete(deleteConfirmation.id, deleteConfirmation.type)} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Yes, Delete
                </button>
                <button 
                  onClick={() => setDeleteConfirmation(null)} 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StudentRegistrationForm = ({ onAddUser, onCancel, defaultRole = "student", programs }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState(programs.length > 0 ? programs[0].name : "");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [educationLevel, setEducationLevel] = useState("completedSchool");
  const [grade, setGrade] = useState("12");
  const [score, setScore] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }

    const userData = { 
      name, 
      email, 
      role, 
      program, 
      phone, 
      gender, 
      educationLevel, 
      grade, 
      score,
      dob,
      address,
      createdAt: new Date()
    };
    onAddUser(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Role</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      {role === "student" && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Program</label>
            <select 
              value={program} 
              onChange={(e) => setProgram(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {programs.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Education Level</label>
            <select 
              value={educationLevel} 
              onChange={(e) => setEducationLevel(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="completedSchool">Completed School</option>
              <option value="grade10">Grade 10</option>
              <option value="grade12">Grade 12</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Grade</label>
            <select 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Score/GPA</label>
            <input 
              type="number" 
              value={score} 
              onChange={(e) => setScore(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter score or GPA"
              min="0"
              max="100"
              required
            />
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Phone Number</label>
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Date of Birth</label>
        <input 
          type="date" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Gender</label>
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Address</label>
        <textarea 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          rows="3"
          required
        />
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="flex justify-between">
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          Register
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const EditStudentForm = ({ user, onEditUser, onCancel, programs }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [program, setProgram] = useState(user.program || (programs.length > 0 ? programs[0].name : ""));
  const [phone, setPhone] = useState(user.phone || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [role, setRole] = useState(user.role || "student");
  const [educationLevel, setEducationLevel] = useState(user.educationLevel || "completedSchool");
  const [grade, setGrade] = useState(user.grade || "12");
  const [score, setScore] = useState(user.score || "");
  const [dob, setDob] = useState(user.dob || "");
  const [address, setAddress] = useState(user.address || "");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }

    const userData = { 
      id: user.id, 
      name, 
      email, 
      role, 
      phone, 
      gender,
      dob,
      address,
      ...(role === "student" && { 
        program,
        educationLevel,
        grade,
        score
      })
    };
    onEditUser(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Role</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      {role === "student" && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Program</label>
            <select 
              value={program} 
              onChange={(e) => setProgram(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {programs.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Education Level</label>
            <select 
              value={educationLevel} 
              onChange={(e) => setEducationLevel(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="completedSchool">Completed School</option>
              <option value="grade10">Grade 10</option>
              <option value="grade12">Grade 12</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Grade</label>
            <select 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Score/GPA</label>
            <input 
              type="number" 
              value={score} 
              onChange={(e) => setScore(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              min="0"
              max="100"
              required
            />
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Phone Number</label>
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Date of Birth</label>
        <input 
          type="date" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Gender</label>
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Address</label>
        <textarea 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          rows="3"
          required
        />
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="flex justify-between">
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
        >
          <FaEdit className="mr-2" />
          Update
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminPanel;