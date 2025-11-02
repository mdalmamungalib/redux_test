"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/features/slice/getUserSlice";
import UserProfile from "../UserProfile/UserProfile";

export default function Users() {
  const dispatch = useDispatch();

  const { usersApiData = [], isLoading = false, error = null } =
    useSelector((state) => state.getUserSlice ?? {});

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              User Profiles
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Browse and manage users retrieved from the API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(getUserData())}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Refresh
            </button>
          </div>
        </header>

        {isLoading && (
          <div className="py-8">
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">Loading users…</p>
          </div>
        )}

        {error && (
          <div className="py-4">
            <p className="text-sm text-center text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        )}

        {!isLoading && usersApiData.length === 0 && !error && (
          <div className="py-8">
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">No users found.</p>
          </div>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {usersApiData.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {/* UserProfile expects a `user` prop — pass the user object */}
              <UserProfile user={user} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}