import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { useRental } from '../contexts/RentalContext';

const TrackingMap: React.FC = () => {
  const { activeRental, updateRentalStatus } = useRental();
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [tripStatus, setTripStatus] = useState<'started' | 'in-progress' | 'completed'>('in-progress');
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate location updates
  useEffect(() => {
    if (!activeRental) return;

    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [activeRental]);

  if (!activeRental) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Rental</h3>
        <p className="text-gray-600">You don't have any active rentals to track at the moment.</p>
      </div>
    );
  }

  const handleCompleteTrip = () => {
    updateRentalStatus(activeRental.id, 'completed');
    setTripStatus('completed');
  };

  return (
    <div className="space-y-6">
      {/* Rental Info Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={activeRental.image}
              alt={activeRental.model}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{activeRental.model}</h3>
              <p className="text-gray-600">{activeRental.fromLocation} → {activeRental.toLocation}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Active Rental
                </span>
                <span className="text-sm text-gray-600">{activeRental.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${activeRental.price}</div>
            <p className="text-sm text-gray-600">Total Cost</p>
          </div>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {/* Simulated Map */}
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-700 font-medium">Live GPS Tracking</p>
              <p className="text-sm text-gray-600">
                Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
          
          {/* Animated location marker */}
          <motion.div
            animate={{
              x: [0, 10, -10, 0],
              y: [0, -5, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-4 left-4 w-3 h-3 bg-blue-600 rounded-full shadow-lg"
          />
          
          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 20 40 Q 100 20 180 60 T 350 100"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Trip Status */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Navigation className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Current Status</p>
                <p className="text-sm text-gray-600 capitalize">{tripStatus.replace('-', ' ')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Estimated Time</p>
                <p className="text-sm text-gray-600">{estimatedTime} minutes remaining</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Distance</p>
                <p className="text-sm text-gray-600">12.5 km traveled</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Phone className="h-4 w-4" />
            <span>Call Support</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <MessageCircle className="h-4 w-4" />
            <span>Chat</span>
          </button>
          
          {tripStatus !== 'completed' && (
            <button
              onClick={handleCompleteTrip}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Complete Trip</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium text-red-900">Emergency Support</p>
            <p className="text-sm text-red-700">Available 24/7 at +1 (555) 911-HELP</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackingMap;