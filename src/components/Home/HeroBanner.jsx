"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Box, Plus, Minus } from 'lucide-react';

const HeroBanner = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [merchandise, setMerchandise] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Fake "search" functionality
  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log({
        pickup: pickupLocation,
        delivery: deliveryLocation,
        merchandise: merchandise
      });
      setIsLoading(false);
      alert("Search initiated for: " + (pickupLocation || "Algeria"));
    }, 1000);
  };

  // Generate random vehicle markers clustered to look like Europe/North Africa
  const generateMarkers = () => {
    const markers = [];
    const count = 65;
    
    for (let i = 0; i < count; i++) {
      // Generate numbers like the screenshot (2 digit or 3 digit)
      const val = Math.floor(Math.random() * 900) + 10;
      markers.push({
        id: i,
        // Bias positions towards center to simulate a landmass
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
        val: val
      });
    }
    return markers;
  };

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(generateMarkers());
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#A5CBC3] font-sans">
      
      {/* --- 1. Map Background Layer --- */}
      <div className="absolute inset-0">
        {/* Water Color Background */}
        <div className="w-full h-full bg-[#bfd4df] relative overflow-hidden">
          
          {/* Abstract Land Shapes (SVG to simulate the map background in screenshot) */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none">
             {/* Rough shape of Europe/Africa landmass background color */}
             <path d="M -100 0 L 100 0 L 100 100 L -100 100 Z" fill="#E8E6E1" />
             <path d="M 0 0 C 30 20 50 10 80 0 L 100 0 L 100 100 L 0 100 Z" fill="#d1d5db" opacity="0.2"/>
          </svg>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          {/* --- Markers --- */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:z-50 hover:scale-125 cursor-pointer"
              style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
            >
              <div className="relative group">
                {/* The Green Bubble Pin */}
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-[#8cb938] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.3)] border border-[#7aa331]">
                   <span className="text-white font-bold text-xs md:text-sm">{marker.val}</span>
                </div>
                {/* Little triangle at bottom to make it a pin */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#8cb938]"></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded text-xs shadow-lg whitespace-nowrap z-50 pointer-events-none">
                  Vehicle #{marker.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 2. Top Right Controls --- */}
      {/* Available Vehicle Legend */}
      <div className="absolute top-6 right-6 md:right-20 flex flex-col gap-4 z-20">
        <div className="bg-white rounded shadow-md px-3 py-2 flex items-center gap-3">
          <div className="w-6 h-8 relative flex items-center justify-center">
             {/* Mini Pin Icon */}
             <div className="w-5 h-5 bg-[#8cb938] rounded-full flex items-center justify-center shadow-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
             <div className="absolute -bottom-0.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#8cb938]"></div>
          </div>
          <span className="text-gray-600 text-sm font-medium">= Available vehicle</span>
        </div>

        {/* Zoom Controls */}
        <div className="self-end flex flex-col bg-white rounded shadow-md overflow-hidden w-10">
          <button 
            onClick={() => setZoom(z => z + 0.1)}
            className="h-10 flex items-center justify-center hover:bg-gray-100 border-b border-gray-200 text-gray-600">
            <Plus size={20} />
          </button>
          <button 
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600">
            <Minus size={20} />
          </button>
        </div>
      </div>

      {/* --- 3. Main Text Overlay (Left Side) --- */}
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

      {/* --- 4. Bottom Search Bar --- */}
      <div className="absolute bottom-[40px] left-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-t-2xl shadow-2xl p-6 w-full">
            <h3 className="text-gray-700 font-semibold mb-5 text-base">
              Find a transporter in on click
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
              
              {/* Pickup Input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Pickup (postal code or city)
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                       <MapPin className="w-4 h-4 text-white" />
                     </div>
                  </div>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Martyrs' Memorial, Algeria"
                    className="w-full bg-white pl-14 pr-4 py-3.5 text-sm text-gray-900 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Delivery Input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Delivery (postal code or city)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                       <MapPin className="w-4 h-4 text-white" />
                     </div>
                  </div>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Martyrs' Memorial, Algeria"
                    className="w-full bg-white pl-14 pr-4 py-3.5 text-sm text-gray-900 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Merchandise Input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Merchandise to be shipped
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                       <Box className="w-4 h-4 text-white" />
                     </div>
                  </div>
                  <input
                    type="text"
                    value={merchandise}
                    onChange={(e) => setMerchandise(e.target.value)}
                    placeholder="Food commodities"
                    className="w-full bg-white pl-14 pr-4 py-3.5 text-sm text-gray-900 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="lg:w-auto w-full">
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full lg:w-auto px-10 py-3.5 bg-[#0066cc] text-white text-sm font-bold rounded-full hover:bg-[#0052a3] active:scale-95 transform transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? 'Searching...' : 'Direct Rate'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;