"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../app/globals.css';


Modal.setAppElement('#__next'); 

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [noMoreData, setNoMoreData] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', enabled: true, permalink: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, [limit, offset, search, filter, sortKey, sortOrder]);

  const fetchUsers = async () => {
    setLoading(true);
    setNoMoreData(false);
    try {
      const response = await axios.get('http://localhost:3003/users', {
        params: {
          limit,
          offset,
          search,
          filter,
          sortKey,
          sortOrder,
        },
      });

      const fetchedUsers = response.data;
      if (fetchedUsers.length === 0) {
        setNoMoreData(true);
      } else {
        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setOffset(0);
  };

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
    setOffset(0);
  };

  const handleSortChange = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setUserToDelete(null);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3003/users/${userToDelete.id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      closeDeleteModal();
    }
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalIsOpen(false);
    setNewUser({ name: '', email: '', enabled: true, permalink: '', password: '' });
  };

  const handleCreateUserChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:3003/users', newUser);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      closeCreateModal();
    }
  };

  return (
    <div className="bg-gray-200 p-8 rounded">
      <h1 className="text-2xl text-gray-800 mb-8">Users</h1>
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearch}
          className="p-2 mr-4 rounded border border-gray-300 min-w-200"
        />
        <select name="enabled" onChange={handleFilterChange} className="p-2 rounded border border-gray-300">
          <option value="">All</option>
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
        <button onClick={openCreateModal} className="ml-4 p-2 rounded border-none bg-green-500 text-white cursor-pointer">Create User</button>
      </div>
      <table className="w-full border-collapse bg-white rounded border-gray-300">
        <thead>
          <tr className="bg-gray-300">
            <th onClick={() => handleSortChange('name')} className="cursor-pointer p-2 border border-gray-300">Name</th>
            <th onClick={() => handleSortChange('email')} className="cursor-pointer p-2 border border-gray-300">Email</th>
            <th onClick={() => handleSortChange('enabled')} className="cursor-pointer p-2 border border-gray-300">Enabled</th>
            <th onClick={() => handleSortChange('permalink')} className="cursor-pointer p-2 border border-gray-300">Permalink</th>
            <th onClick={() => handleSortChange('createdAt')} className="cursor-pointer p-2 border border-gray-300">Created At</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center p-4">Loading...</td>
            </tr>
          ) : noMoreData ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No more data</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td className="p-2 border border-gray-300">{user.name}</td>
                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">{user.enabled ? 'Yes' : 'No'}</td>
                <td className="p-2 border border-gray-300">{user.permalink}</td>
                <td className="p-2 border border-gray-300">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                </td>
                <td className="p-2 border border-gray-300">
                  <button onClick={() => openDeleteModal(user)} className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-8">
        <button
          disabled={offset === 0}
          onClick={() => handlePageChange(offset - limit)}
          className="p-2 mr-4 rounded border border-gray-300 bg-gray-300 text-gray-800 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(offset + limit)}
          className="p-2 rounded border border-gray-300 bg-gray-300 text-gray-800 cursor-pointer"
        >
          Next
        </button>
      </div>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete User Confirmation"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid #ccc'
          },
        }}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete {userToDelete?.name}?</p>
        <button onClick={deleteUser} className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer mr-2">Delete</button>
        <button onClick={closeDeleteModal} className="px-4 py-2 rounded border border-gray-300 bg-gray-300 text-gray-800 cursor-pointer">Cancel</button>
      </Modal>
      <Modal
        isOpen={createModalIsOpen}
        onRequestClose={closeCreateModal}
        contentLabel="Create User"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '30px',
            margin:'10px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid #ccc'
          },
        }}
      >
        <h2>Create User</h2>
        <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter name"
              name="name"
              value={newUser.name}
              onChange={handleCreateUserChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              value={newUser.email}
              onChange={handleCreateUserChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="permalink">Permalink</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="permalink"
              type="text"
              placeholder="Enter permalink"
              name="permalink"
              value={newUser.permalink}
              onChange={handleCreateUserChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={newUser.password}
              onChange={handleCreateUserChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="enabled">Enabled</label>
            <input
              className="mr-2 leading-tight"
              id="enabled"
              type="checkbox"
              name="enabled"
              checked={newUser.enabled}
              onChange={handleCreateUserChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={closeCreateModal}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;
