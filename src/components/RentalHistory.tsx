import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, MapPin, Download, Eye, Car, Bike, Filter } from 'lucide-react';
import { useRental } from '../contexts/RentalContext';

const RentalHistory: React.FC = () => {
  const { rentals } = useRental();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

  const filteredRentals = rentals
    .filter(rental => filterStatus === 'all' || rental.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else {
        return b.price - a.price;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSpent = rentals
    .filter(rental => rental.status === 'completed')
    .reduce((sum, rental) => sum + rental.price, 0);

  const activeRentals = rentals.filter(rental => rental.status === 'active').length;
  const completedRentals = rentals.filter(rental => rental.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid sm:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rentals</p>
              <p className="text-2xl font-bold text-green-600">{activeRentals}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Car className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{completedRentals}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${totalSpent}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Rentals</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="date">Date</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Rental List */}
      <div className="space-y-4">
        {filteredRentals.length > 0 ? (
          filteredRentals.map((rental, index) => (
            <motion.div
              key={rental.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={rental.image}
                    alt={rental.model}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{rental.model}</h3>
                      {rental.type === 'bike' ? 
                        <Bike className="h-4 w-4 text-blue-600" /> : 
                        <Car className="h-4 w-4 text-blue-600" />
                      }
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{rental.startDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{rental.fromLocation} → {rental.toLocation}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rental.status)}`}>
                        {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">{rental.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-2">${rental.price}</div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Rentals Found</h3>
            <p className="text-gray-600">
              {filterStatus === 'all' 
                ? "You haven't made any rentals yet. Start exploring our fleet!" 
                : `No ${filterStatus} rentals found.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RentalHistory;