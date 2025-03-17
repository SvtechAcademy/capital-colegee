import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, query, onSnapshot, addDoc, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; 
import { FaUserPlus, FaRegUser, FaUsers, FaClipboard, FaTrash, FaUserTie, FaUserGraduate } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const db = getFirestore();
const auth = getAuth();

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [webs, setWebs] = useState([]);  // Placeholder for Webs data
  const [freelacer, setFreelacer] = useState([]);  // Placeholder for Freelacer data
  const [selectedView, setSelectedView] = useState("users"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/"); // Redirect to home if no user is logged in
        return;
      }

      // Fetch user data from Firestore to check role
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role); // Set the user's role

        if (userData.role !== "admin") {
          navigate("/"); // Redirect to home if user is not an admin
          return;
        }
      } else {
        navigate("/"); // Redirect to home if user data does not exist
        return;
      }
    };

    fetchUserRole();
  }, [navigate]);

  useEffect(() => {
    if (userRole !== "admin") return; // Only fetch data if the user is an admin

    const fetchData = () => {
      const usersRef = collection(db, "users");
      const postsRef = collection(db, "posts");
      const studentsRef = collection(db, "students");
      const teachersRef = collection(db, "teachers");
      const customersRef = collection(db, "customers");

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
        setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubscribeUsers();
        unsubscribePosts();
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
    const ref = type === 'user' ? "users" : "posts";
    try {
      await deleteDoc(doc(db, ref, id));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
      setDeleteConfirmation(null);
    } catch (error) {
      toast.error(`Error deleting ${type}: ` + error.message);
    }
  };

  const deleteUser = (id) => setDeleteConfirmation({ type: 'user', id });
  const deletePost = (id) => setDeleteConfirmation({ type: 'post', id });

  const SidebarButton = ({ view, icon, label }) => (
    <button 
      onClick={() => setSelectedView(view)} 
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

      const usersQuery = query(usersRef);
      const querySnapshot = await getDocs(usersQuery);
      const userDataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setUsers(userDataArray);
      setAdmins(userDataArray.filter(user => user.role === "admin"));
      setStudents(userDataArray.filter(user => user.role === "student"));
      setTeachers(userDataArray.filter(user => user.role === "teacher"));
      setCustomers(userDataArray.filter(user => user.role === "customer"));
    } catch (error) {
      toast.error("Error adding user: " + error.message);
    }
  };

  if (userRole !== "admin") {
    return null; // Don't render the admin panel if the user is not an admin
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <ToastContainer />
      
      {/* Sidebar */}
      <div className={`lg:w-64 bg-blue-950 text-white p-6 flex flex-col ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
        <button 
          className="lg:hidden text-white text-2xl mb-4" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <div className="space-y-4">
          <SidebarButton view="users" icon={<FaUsers />} label="Users" />
          <SidebarButton view="admins" icon={<FaRegUser />} label="Admins" />
          <SidebarButton view="customers" icon={<FaUserTie />} label="Customers" />
          <SidebarButton view="students" icon={<FaUserGraduate />} label="Students" />
          <SidebarButton view="teachers" icon={<FaUserPlus />} label="Teachers" />
          <SidebarButton view="posts" icon={<FaClipboard />} label="Posts" />
          <SidebarButton view="addUser" icon={<FaUserPlus />} label="Add User" />
          <button onClick={handleLogout} className="p-3 hover:bg-blue-700 rounded text-white flex items-center">
            <FaRegUser className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-bold text-blue-950 mb-6">Dashboard</h2>

        {/* Cards to display numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-6">
          {[{
            label: 'Users', count: users.length, view: 'users', icon: <FaUsers />
          }, {
            label: 'Admins', count: admins.length, view: 'admins', icon: <FaRegUser />
          }, {
            label: 'Students', count: students.length, view: 'students', icon: <FaUserGraduate />
          }, {
            label: 'Teachers', count: teachers.length, view: 'teachers', icon: <FaUserPlus />
          }, {
            label: 'Customers', count: customers.length, view: 'customers', icon: <FaUserTie /> 
          }, {
            label: 'Posts', count: posts.length, view: 'posts', icon: <FaClipboard />
          }, {
            label: 'Webs', count: webs.length, view: 'webs', icon: <FaRegUser />
          }, {
            label: 'Freelacer', count: freelacer.length, view: 'freelacer', icon: <FaRegUser />
          }].map(({ label, count, view, icon }) => (
            <div key={view} className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between cursor-pointer" onClick={() => setSelectedView(view)}>
              <div>
                <h3 className="text-lg font-semibold text-blue-950">{label}</h3>
                <p className="text-xl text-blue-600">{count}</p>
              </div>
              <span className="text-3xl text-blue-600">{icon}</span>
            </div>
          ))}
        </div>

        {/* Add User Form */}
        {selectedView === "addUser" && (
          <div>
            <h3 className="text-xl font-semibold text-blue-950">Add New User</h3>
            <AddUserForm onAddUser={handleAddUser} />
          </div>
        )}

        {/* Display Selected View Below Cards */}
        {["admins", "customers", "students", "teachers","users"].includes(selectedView) && (
          <div>
            <h3 className="text-xl font-semibold text-blue-950">{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}</h3>
            <ul className="mt-4">
              {(selectedView === 'admins' ? admins :
               selectedView === 'users' ? users :
                selectedView === 'customers' ? customers :
                selectedView === 'students' ? students :
                selectedView === 'teachers' ? teachers : users).map(user => (
                <li key={user.id} className="p-2 border-b flex justify-between">
                  <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleString() : 'Not available'}</p>
                    <p><strong>UID:</strong> {user.uid}</p>
                  </div>
                  <button onClick={() => deleteUser(user.id)} className="text-red-600 p-2 hover:bg-red-100 rounded">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Posts */}
        {selectedView === "posts" && (
          <div>
            <h3 className="text-xl font-semibold text-blue-950">Posts</h3>
            <ul className="mt-4">
              {posts.map(post => (
                <li key={post.id} className="p-2 border-b flex justify-between">
                  <div>
                    <p><strong>Title:</strong> {post.title}</p>
                    <p><strong>Content:</strong> {post.content}</p>
                  </div>
                  <button onClick={() => deletePost(post.id)} className="text-red-600 p-2 hover:bg-red-100 rounded">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this item?</h3>
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => {
                  deleteConfirmation.type === "user" ? handleDelete(deleteConfirmation.id, "user") : handleDelete(deleteConfirmation.id, "post");
                }} 
                className="bg-red-600 text-white px-4 py-2 rounded">
                Yes
              </button>
              <button 
                onClick={() => setDeleteConfirmation(null)} 
                className="bg-gray-600 text-white px-4 py-2 rounded">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }

    const userData = { name, email, role, phone, gender };
    onAddUser(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone</label>
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Gender</label>
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          className="w-full p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Role</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded">
        Add User
      </button>
    </form>
  );
};

export default AdminPanel;