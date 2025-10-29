"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '@/features/posts/postSlice'
import UserProfile from '../UserProfile/UserProfile'

const Todo = () => {
  const dispatch = useDispatch()
  const { isLoading, posts, error } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  // Function to toggle todo completion
  const toggleTodo = (id) => {
    // You would typically dispatch an action here to update state
    console.log("Toggling todo:", id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 sm:p-4 ">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            User Directory
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Explore and connect with amazing people
          </p>
        </motion.div>

        {/* Todo List */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >

          {/* Loading state */}
          {isLoading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <motion.div
              className="p-4 mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Error: {error.message || 'An error occurred'}
            </motion.div>
          )}

          {/* Posts Grid */}
          {posts && posts.length > 0 && (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <UserProfile user={post} key={post.id}/>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && posts?.length === 0 && (
            <motion.div
              className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No tasks yet. Add a new task to get started!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Todo
