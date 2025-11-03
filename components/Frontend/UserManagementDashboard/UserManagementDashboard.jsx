"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { MdFolderDelete } from "react-icons/md";
import { addStudent, removeStudent } from "@/features/slice/studentSlice";
import {
  addEmployee,
  editEmployee,
  removeEmployee,
} from "@/features/slice/userSlice";
import { CiEdit } from "react-icons/ci";

export default function UserManagementDashboard() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", avatar: "" });

  const employeeData = useSelector((state) => state.userSlice.employees) || [];

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          avatar: "/avatar1.jpg",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          avatar: "/avatar2.jpg",
        },
        {
          id: 3,
          name: "Alex Johnson",
          email: "alex@example.com",
          avatar: "/avatar3.jpg",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // ...existing code...
  const handleSubmit = (e) => {
    e.preventDefault();
    const userWithId = {
      ...newUser,
      id: editingId || nanoid(),
    };
    console.log(userWithId);
    if (editingId) {
      dispatch(editEmployee(userWithId));
    } else {
      dispatch(addEmployee(userWithId));
    }
    setShowModal(false);
    setNewUser({
      name: "",
      email: "",
      avatar: "",
    });
    setEditingId(null);
  };
  // ...existing code...

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Employee Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your team members and their permissions
          </p>
        </header>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Team Members
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={() => setShowModal(true)}>
              Add Employee
            </motion.button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <UserCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {employeeData.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  setNewUser={setNewUser}
                  setEditingId={setEditingId}
                  setShowModal={setShowModal}
                  editingId={editingId}
                />
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {showModal && (
            <AddUserModal
              newUser={newUser}
              setNewUser={setNewUser}
              handleSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
              editingId={editingId}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UserCard({ user, setNewUser, setEditingId, setShowModal, editingId }) {
  const dispatch = useDispatch();
  const handleEditClick = (user) => {
    setNewUser({
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || "",
    });
    setEditingId(user.id);
    setShowModal(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-600">
          <span className="text-lg font-medium">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => dispatch(removeEmployee(user?.id))}
            aria-label="Delete folder"
            className={
              "inline-flex items-center justify-center w-10 h-10 rounded-lg transition-transform transition-shadow " +
              "bg-slate-100 hover:bg-red-50 dark:bg-slate-700 dark:hover:bg-red-900 " +
              "shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
              "focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed group"
            }>
            <MdFolderDelete
              className="w-8 h-8 transition-colors transform text-slate-700 group-hover:text-red-600 dark:text-slate-200 dark:group-hover:text-red-400 group-hover:scale-110"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => (handleEditClick ? handleEditClick(user) : null)}
            aria-label="Delete folder"
            className={
              "inline-flex items-center justify-center w-10 h-10 rounded-lg transition-transform transition-shadow " +
              "bg-slate-100 hover:bg-red-50 dark:bg-slate-700 dark:hover:bg-red-900 " +
              "shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
              "focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed group"
            }>
            <CiEdit
              className="w-8 h-8 text-indigo-700 transition-colors transform group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:indigo-red-400 group-hover:scale-110"
              aria-hidden="true"
            />
          </button>

          {/* Tooltip */}
          <span className="absolute px-2 py-1 mb-2 text-xs text-white transition-opacity -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none left-1/2 bottom-full group-hover:opacity-100">
            Delete
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function UserCardSkeleton() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-600"></div>
        <div className="space-y-2">
          <div className="w-3/4 h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}

function AddUserModal({
  newUser,
  setNewUser,
  handleSubmit,
  onClose,
  editingId,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="w-full max-w-md p-6 bg-white rounded-lg dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter email address"
            />
          </div>
          <div className="flex pt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
              {editingId ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
