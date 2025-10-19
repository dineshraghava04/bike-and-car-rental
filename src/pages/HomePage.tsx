import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Bike, Clock, Shield, MapPin, Star, CheckCircle, Phone, Mail, MapIcon } from 'lucide-react';

const HomePage: React.FC = () => {
  const vehicles = [
    {
      type: 'bike',
      name: 'Honda CB250R',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      dailyRate: 25,
      features: ['GPS Tracking', 'Bluetooth', 'Safety Gear']
    },
    {
      type: 'bike',
      name: 'Yamaha MT-07',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
      dailyRate: 35,
      features: ['Sport Mode', 'ABS', 'LED Lights']
    },
    {
      type: 'car',
      name: 'Toyota Camry',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      dailyRate: 45,
      features: ['Auto Transmission', 'AC', 'GPS']
    },
    {
      type: 'car',
      name: 'BMW X3',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      dailyRate: 85,
      features: ['Luxury Interior', '4WD', 'Premium Audio']
    }
  ];

  const pricingPlans = [
    {
      duration: 'Daily',
      bikes: { price: '$25-35', savings: null },
      cars: { price: '$45-85', savings: null }
    },
    {
      duration: 'Weekly',
      bikes: { price: '$150-200', savings: '15% off' },
      cars: { price: '$280-500', savings: '15% off' }
    },
    {
      duration: 'Monthly',
      bikes: { price: '$500-650', savings: '25% off' },
      cars: { price: '$1000-1800', savings: '25% off' }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Rent Bikes & Cars
                <span className="block text-blue-300">Your Way</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Premium vehicles available by day, week, or month. Experience the freedom of mobility with our modern fleet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                >
                  Start Renting Now
                </Link>
                <Link
                  to="#vehicles"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 text-center"
                >
                  View Fleet
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg"
                alt="Premium Car"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                Starting $25/day
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RentGo?</h2>
            <p className="text-xl text-gray-600">Experience premium service with every rental</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: 'Fully Insured',
                description: 'All vehicles come with comprehensive insurance coverage for your peace of mind.'
              },
              {
                icon: <MapPin className="h-12 w-12 text-blue-600" />,
                title: 'GPS Tracking',
                description: 'Real-time location tracking and navigation support for all rentals.'
              },
              {
                icon: <Clock className="h-12 w-12 text-blue-600" />,
                title: '24/7 Support',
                description: 'Round-the-clock customer support for any issues or emergencies.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section id="vehicles" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h2>
            <p className="text-xl text-gray-600">Choose from our premium collection of bikes and cars</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                    {vehicle.type === 'bike' ? 
                      <Bike className="h-5 w-5 text-blue-600" /> : 
                      <Car className="h-5 w-5 text-blue-600" />
                    }
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    ${vehicle.dailyRate}/day
                  </div>
                  <ul className="space-y-1">
                    {vehicle.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Pricing</h2>
            <p className="text-xl text-gray-600">Save more with longer rentals</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white p-8 rounded-lg shadow-lg ${index === 1 ? 'ring-4 ring-blue-600' : ''}`}
              >
                {index === 1 && (
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold text-center mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{plan.duration}</h3>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Bike className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium">Bikes</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{plan.bikes.price}</span>
                    </div>
                    {plan.bikes.savings && (
                      <p className="text-sm text-green-600 font-medium">{plan.bikes.savings}</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium">Cars</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{plan.cars.price}</span>
                    </div>
                    {plan.cars.savings && (
                      <p className="text-sm text-green-600 font-medium">{plan.cars.savings}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="h-8 w-8 text-blue-600" />,
                title: 'Call Us',
                info: '+1 (555) 123-4567'
              },
              {
                icon: <Mail className="h-8 w-8 text-blue-600" />,
                title: 'Email Us',
                info: 'support@rentgo.com'
              },
              {
                icon: <MapIcon className="h-8 w-8 text-blue-600" />,
                title: 'Visit Us',
                info: '123 Main St, City, ST 12345'
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center bg-gray-50 p-8 rounded-lg"
              >
                <div className="flex justify-center mb-4">{contact.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{contact.title}</h3>
                <p className="text-gray-600">{contact.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">RentGo</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for bike and car rentals. Experience freedom with every ride.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Bike Rentals</li>
                <li>Car Rentals</li>
                <li>Long-term Leasing</li>
                <li>Corporate Packages</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Safety Guidelines</li>
                <li>Insurance</li>
                <li>Contact Us</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Legal</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RentGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;