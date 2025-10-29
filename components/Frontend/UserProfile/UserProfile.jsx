"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const UserProfile = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with back navigation */}
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="mr-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
        </motion.div>

        {/* Main content card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          
          {/* Profile header with image and basic info */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative h-20 w-20 mr-4">
                <Image
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-4 p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('address')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'address' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
              >
                Address
              </button>
              <button
                onClick={() => setActiveTab('company')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'company' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
              >
                Company
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'profile' && (
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Contact Information</h3>
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-400">Email: {user.email}</p>
                      <p className="text-gray-600 dark:text-gray-400">Phone: {user.phone}</p>
                      <p className="text-gray-600 dark:text-gray-400">Website: {user.website}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'address' && (
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Address</h3>
                    <div className="space-y-2">
                      <p>{user.address.street}</p>
                      <p>{user.address.suite}</p>
                      <p>{user.address.city}, {user.address.zipcode}</p>
                      <div className="flex space-x-2 mt-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                          Lat: {user.address.geo.lat}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 rounded text-sm">
                          Lng: {user.address.geo.lng}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'company' && (
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Company</h3>
                    <p className="font-medium">{user.company.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 italic">{user.company.catchPhrase}</p>
                    <p className="text-sm mt-2">{user.company.bs}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Expandable section */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <span className="font-medium text-gray-900 dark:text-white">Additional Information</span>
              <span className="transform transition-transform">{isExpanded ? '▼' : '▶'}</span>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-600 dark:text-gray-400">User ID: {user.id}</p>
                    <p className="text-gray-600 dark:text-gray-400">Username: {user.username}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default UserProfile