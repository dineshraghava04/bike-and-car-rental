import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, DollarSign, CreditCard, CheckCircle } from 'lucide-react';
import { useRental } from '../contexts/RentalContext';

interface BookingModalProps {
  vehicle: any;
  duration: string;
  fromLocation: string;
  toLocation: string;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  vehicle,
  duration,
  fromLocation,
  toLocation,
  onClose
}) => {
  const { addRental } = useRental();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [fromLoc, setFromLoc] = useState(fromLocation);
  const [toLoc, setToLoc] = useState(toLocation);

  const getRateForDuration = () => {
    switch (duration) {
      case 'week':
        return vehicle.weeklyRate;
      case 'month':
        return vehicle.monthlyRate;
      default:
        return vehicle.dailyRate;
    }
  };

  const totalPrice = getRateForDuration();
  const tax = Math.round(totalPrice * 0.1);
  const finalPrice = totalPrice + tax;

  const handleNext = () => {
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      handleBooking();
    }
  };

  const handleBooking = () => {
    const newRental = {
      type: vehicle.type as 'bike' | 'car',
      model: vehicle.name,
      duration: `${duration}`,
      fromLocation: fromLoc,
      toLocation: toLoc,
      price: finalPrice,
      status: 'active' as const,
      startDate: pickupDate,
      endDate: returnDate,
      image: vehicle.image
    };

    addRental(newRental);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {step === 'details' ? 'Booking Details' : 
             step === 'payment' ? 'Payment' : 'Booking Confirmed'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-6">
              {/* Vehicle Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <p className="text-gray-600">${getRateForDuration()}/{duration}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={fromLoc}
                      onChange={(e) => setFromLoc(e.target.value)}
                      placeholder="Enter pickup location"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={toLoc}
                      onChange={(e) => setToLoc(e.target.value)}
                      placeholder="Enter drop-off location"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Rental Fee ({duration})</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">${finalPrice}</div>
                <p className="text-gray-600">Total Amount</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">
                  Your {vehicle.name} has been booked successfully. 
                  You can track your rental in the dashboard.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-blue-900 mb-2">Booking Details:</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>Vehicle: {vehicle.name}</p>
                  <p>Duration: {duration}</p>
                  <p>Pickup: {fromLoc}</p>
                  <p>Drop-off: {toLoc}</p>
                  <p>Total: ${finalPrice}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between">
          {step !== 'success' && (
            <>
              <button
                onClick={step === 'details' ? onClose : () => setStep('details')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                {step === 'details' ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={handleNext}
                disabled={step === 'details' && (!pickupDate || !returnDate || !fromLoc || !toLoc)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {step === 'details' ? 'Continue' : 'Confirm Booking'}
              </button>
            </>
          )}
          {step === 'success' && (
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;