"use client"; 
import React, { useState } from 'react';
import { MapPin, Package } from 'lucide-react';

const ShipperBanner = () => {
  const [pickupLocation, setPickupLocation] = useState('Martyrs\' Memorial, Algeria');
  const [deliveryLocation, setDeliveryLocation] = useState('Martyrs\' Memorial, Algeria');
  const [merchandise, setMerchandise] = useState('Food commodities');
  
  const InputGroup = ({ label, value, onChange, Icon, placeholder }) => (
    <div className="flex-1">
      <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
          <Icon className="w-3.5 h-3.5 text-[#0060ad]" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-gray-50 pl-11 pr-4 py-3 text-sm text-gray-800 rounded-lg border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-800 font-medium"
        />
      </div>
    </div>  
  );
[]
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
       
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/semi-truck.png')",

          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >  
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Main Content */}
        <div className="max-w-2xl mb-32">
          {/* Main Heading with overlay box */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {/* The Semi-transparent Dark Box */}
            <div className="bg-gray-900/40 backdrop-blur-[1px] p-8 md:p-12 rounded-sm max-w-xl lg:max-w-2xl pointer-events-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-md">
                A simple, fast, and reliable transport solution
                </h1>
                <p className="text-white/90 text-lg leading-relaxed drop-shadow-sm">
                Simplify your logistics with Lawapan Truck. Track your shipment in real time, get secure payments, and connect with trusted transporters.
                </p>
            </div>
        </div>
      </div>
        </div>

        {/* Quick Truck Search Form - Positioned at bottom */}
        <div className="absolute bottom-[40px] left-0 right-0 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-5">
              <h3 className="text-gray-700 font-semibold mb-4 text-sm md:text-base">
                Quick truck search
              </h3>
              
              <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
                
                {/* Pickup Location */}
                <InputGroup 
                  label="Pickup (postal code or city)" 
                  value={pickupLocation} 
                  onChange={setPickupLocation} 
                  Icon={MapPin}
                  placeholder="Martyrs' Memorial, Algeria"
                />

                {/* Delivery Location */}
                <InputGroup 
                  label="Delivery (postal code or city)" 
                  value={deliveryLocation} 
                  onChange={setDeliveryLocation} 
                  Icon={MapPin}
                  placeholder="Martyrs' Memorial, Algeria"
                />

                {/* Merchandise */}
                <InputGroup 
                  label="Merchandise to be shipped" 
                  value={merchandise} 
                  onChange={setMerchandise} 
                  Icon={Package}
                  placeholder="Food commodities"
                />

                {/* Direct Rate Button */}
                <div className="lg:w-auto w-full">
                  <button className="w-full lg:w-auto px-8 py-3 bg-[#0060ad] text-white text-sm font-bold rounded-full hover:bg-blue-700 active:scale-95 transform transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                    Direct Rate
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperBanner;