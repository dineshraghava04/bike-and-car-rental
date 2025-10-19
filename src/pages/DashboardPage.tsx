import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Car, Bike, Filter, Calendar, DollarSign, Navigation, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRental } from '../contexts/RentalContext';
import BookingModal from '../components/BookingModal';
import TrackingMap from '../components/TrackingMap';
import RentalHistory from '../components/RentalHistory';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { activeRental } = useRental();
  const [activeTab, setActiveTab] = useState<'search' | 'track' | 'history'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState<'all' | 'bike' | 'car'>('all');
  const [duration, setDuration] = useState<'day' | 'week' | 'month'>('day');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const vehicles = [
    {
      id: '1',
      type: 'bike',
      name: 'Honda CB250R',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      dailyRate: 25,
      weeklyRate: 150,
      monthlyRate: 500,
      features: ['GPS Tracking', 'Bluetooth', 'Safety Gear'],
      available: true
    },
    {
      id: '2',
      type: 'bike',
      name: 'Yamaha MT-07',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
      dailyRate: 35,
      weeklyRate: 200,
      monthlyRate: 650,
      features: ['Sport Mode', 'ABS', 'LED Lights'],
      available: true
    },
    {
      id: '3',
      type: 'car',
      name: 'Toyota Camry',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      dailyRate: 45,
      weeklyRate: 280,
      monthlyRate: 1000,
      features: ['Auto Transmission', 'AC', 'GPS'],
      available: true
    },
    {
      id: '4',
      type: 'car',
      name: 'BMW X3',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      dailyRate: 85,
      weeklyRate: 500,
      monthlyRate: 1800,
      features: ['Luxury Interior', '4WD', 'Premium Audio'],
      available: false
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = vehicleType === 'all' || vehicle.type === vehicleType;
    return matchesSearch && matchesType;
  });

  const handleBookVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsBookingModalOpen(true);
  };

  const getRateForDuration = (vehicle: any, duration: string) => {
    switch (duration) {
      case 'week':
        return vehicle.weeklyRate;
      case 'month':
        return vehicle.monthlyRate;
      default:
        return vehicle.dailyRate;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your rentals and find your perfect ride</p>
        </motion.div>

        {/* Active Rental Quick View */}
        {activeRental && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Active Rental</h3>
                <p className="text-blue-100">{activeRental.model} - {activeRental.duration}</p>
                <p className="text-blue-100 text-sm">{activeRental.fromLocation} → {activeRental.toLocation}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${activeRental.price}</div>
                <button
                  onClick={() => setActiveTab('track')}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg mt-2 hover:bg-blue-50 transition-colors duration-200"
                >
                  Track Now
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-200 p-1 rounded-lg">
          {[
            { id: 'search', label: 'Search & Book', icon: <Search className="h-4 w-4" /> },
            { id: 'track', label: 'Live Tracking', icon: <Navigation className="h-4 w-4" /> },
            { id: 'history', label: 'My Rentals', icon: <Clock className="h-4 w-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search & Book Tab */}
        {activeTab === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Search Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search vehicles..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as any)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="bike">Bikes</option>
                    <option value="car">Cars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value as any)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="day">Daily</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="Pickup location"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-48 object-cover"
                    />
                    {!vehicle.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Currently Unavailable</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                      {vehicle.type === 'bike' ? 
                        <Bike className="h-5 w-5 text-blue-600" /> : 
                        <Car className="h-5 w-5 text-blue-600" />
                      }
                    </div>
                    
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      ${getRateForDuration(vehicle, duration)}/{duration === 'day' ? 'day' : duration}
                    </div>
                    
                    <ul className="space-y-1 mb-4">
                      {vehicle.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleBookVehicle(vehicle)}
                      disabled={!vehicle.available}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {vehicle.available ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Live Tracking Tab */}
        {activeTab === 'track' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TrackingMap />
          </motion.div>
        )}

        {/* Rental History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <RentalHistory />
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          duration={duration}
          fromLocation={fromLocation}
          toLocation={toLocation}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
};

export default DashboardPage;