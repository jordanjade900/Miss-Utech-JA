import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Ticket, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export const Events = () => {
  const coronation = {
    id: 'coronation',
    title: "Grand Coronation",
    subtitle: "The Essence of a Queen",
    date: "Friday, March 27, 2026",
    time: "6:00 PM – 10:00 PM",
    venue: "Alfred Sangster Auditorium",
    price: "From $1,800 JMD",
    image: "https://picsum.photos/seed/coronation-event-bold/1200/600",
    description: "The pinnacle of the pageant journey. A night of elegance, intelligence, and cultural pride where one queen will be crowned. Experience the red carpet, evening wear, and the final Q&A.",
    schedule: [
      { time: "6:00 PM", event: "Red Carpet & Cocktail Hour" },
      { time: "7:00 PM", event: "Prayer & National Anthem" },
      { time: "7:10 PM", event: "Grand Opening & Parade of Queens" },
      { time: "8:00 PM", event: "Evening Wear Competition" },
      { time: "8:45 PM", event: "Top 5 Q&A Session" },
      { time: "9:30 PM", event: "Crowning Ceremony" },
      { time: "10:00 PM", event: "Event Close" }
    ]
  };

  return (
    <div className="bg-rich-black">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 border-b border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 transition-all duration-1000 opacity-10 element-earth"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-4 text-center"
          >
            Event <span className="gold-text-glow">Details</span>
          </motion.h1>
          <p className="text-royal-gold text-xs font-black tracking-[0.5em] uppercase text-center">
            The Grand Coronation
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 py-24 space-y-24"
      >
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { icon: <Calendar size={20} />, label: "Date", val: coronation.date },
            { icon: <Clock size={20} />, label: "Time", val: coronation.time },
            { icon: <MapPin size={20} />, label: "Venue", val: coronation.venue },
            { icon: <Ticket size={20} />, label: "Price", val: coronation.price }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-8 border border-white/10"
            >
              <div className="mb-4 text-earth-main">{item.icon}</div>
              <p className="text-[10px] uppercase tracking-widest text-white mb-1">{item.label}</p>
              <p className="font-bold text-sm tracking-widest">{item.val}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-24">
          {/* Schedule Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-3xl font-serif mb-10 flex items-center gap-4">
                <span className="text-earth-main">/</span> The Schedule
              </h3>
              <div className="space-y-8">
                {coronation.schedule.map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-20 shrink-0 font-black text-sm tracking-tighter text-earth-main">
                      {item.time}
                    </div>
                    <div className="flex-grow pb-8 border-b border-white/5">
                      <p className="text-xl font-serif text-white group-hover:text-white transition-colors">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Description & CTA Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="p-12 text-white bg-earth-main/20 border border-earth-main/30">
              <h3 className="text-3xl font-serif mb-6">Experience Majesty</h3>
              <p className="mb-10 text-white leading-relaxed italic">"{coronation.description}"</p>
              <button className="w-full py-5 font-black uppercase tracking-[0.3em] transition-colors bg-earth-main text-white hover:bg-earth-glow">
                SECURE TICKETS
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
