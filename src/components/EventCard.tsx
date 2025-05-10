import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '../types/Event';
import { formatDate, formatPrice } from '../utils/formatters';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        featured ? 'transform hover:-translate-y-2 transition-transform' : ''
      }`}
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-xs font-bold px-2 py-1 rounded text-white">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full px-3 py-1">
            {event.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">{event.title}</h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-600">{formatPrice(event.ticketPrice)}</span>
          
          <Link
            to={`/events/${event.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;