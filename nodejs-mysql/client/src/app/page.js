// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [limit, setLimit] = useState(10);
//   const [offset, setOffset] = useState(0);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState({});
//   const [sortKey, setSortKey] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('ASC');

//   useEffect(() => {
//     fetchUsers();
//   }, [limit, offset, search, filter, sortKey, sortOrder]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3003/users', {
//         params: { limit, offset, search, filter, sortKey, sortOrder }
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearch(event.target.value);
//     setOffset(0);
//   };

//   const handleFilterChange = (event) => {
//     setFilter({ ...filter, [event.target.name]: event.target.value });
//     setOffset(0);
//   };

//   const handleSortChange = (key) => {
//     setSortKey(key);
//     setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
//   };

//   const handlePageChange = (newOffset) => {
//     setOffset(newOffset);
//   };

//   return (
//     <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px' }}>
//       <h1 style={{ color: '#333', marginBottom: '20px' }}>Users</h1>
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={search}
//           onChange={handleSearch}
//           style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
//         />
//         <select name="enabled" onChange={handleFilterChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
//           <option value="">All</option>
//           <option value="true">Enabled</option>
//           <option value="false">Disabled</option>
//         </select>
//       </div>
//       <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
//         <thead>
//           <tr style={{ background: '#f0f0f0' }}>
//             <th onClick={() => handleSortChange('name')} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ddd' }}>Name</th>
//             <th onClick={() => handleSortChange('email')} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ddd' }}>Email</th>
//             <th onClick={() => handleSortChange('enabled')} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ddd' }}>Enabled</th>
//             <th onClick={() => handleSortChange('createdAt')} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ddd' }}>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
//             </tr>
//           ) : (
//             users.map(user => (
//               <tr key={user.id}>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.enabled ? 'Yes' : 'No'}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//       <div style={{ marginTop: '20px' }}>
//         <button
//           disabled={offset === 0}
//           onClick={() => handlePageChange(offset - limit)}
//           style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: '#333', cursor: 'pointer' }}
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => handlePageChange(offset + limit)}
//           style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: '#333', cursor: 'pointer' }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;
