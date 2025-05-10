import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Share2, Users, Ticket, Info } from 'lucide-react';
import { Event } from '../types/Event';
import { API_BASE_URL } from '../config/constants';
import { formatDate, formatPrice, formatDateRange } from '../utils/formatters';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'schedule'>('details');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // In a real app, fetch from the API
        const response = await fetch(`${API_BASE_URL}/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
        
        // For demo purposes, create a sample event
        setEvent({
          id: parseInt(id || '1'),
          title: 'Tech Conference 2025',
          description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops. This three-day event will bring together developers, designers, and tech enthusiasts from around the world.\n\nAttendees will have the opportunity to:\n- Network with industry professionals\n- Attend workshops and seminars\n- Explore the latest technologies\n- Participate in hands-on coding sessions\n\nWhether you\'re a seasoned developer or just starting your tech journey, this conference offers valuable insights and connections for everyone in the field.',
          location: 'San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103',
          date: '2025-06-15T09:00:00',
          endDate: '2025-06-17T18:00:00',
          imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          organizer: {
            id: 1,
            name: 'TechEvents Inc.',
            email: 'contact@techevents.com'
          },
          ticketPrice: 299.99,
          featured: true,
          category: 'Technology',
          tickets: [
            {
              id: 1,
              name: 'General Admission',
              price: 299.99,
              quantity: 500,
              description: 'Access to all conference sessions and workshops'
            },
            {
              id: 2,
              name: 'VIP Package',
              price: 499.99,
              quantity: 100,
              description: 'General admission plus exclusive networking events and premium seating'
            },
            {
              id: 3,
              name: 'Student Discount',
              price: 149.99,
              quantity: 200,
              description: 'Valid student ID required at check-in'
            }
          ],
          schedule: [
            {
              id: 1,
              title: 'Registration & Welcome Coffee',
              startTime: '2025-06-15T08:00:00',
              endTime: '2025-06-15T09:00:00',
              location: 'Main Hall'
            },
            {
              id: 2,
              title: 'Opening Keynote: The Future of Technology',
              startTime: '2025-06-15T09:30:00',
              endTime: '2025-06-15T10:30:00',
              speaker: 'Jane Smith, CTO of Future Tech',
              location: 'Grand Ballroom'
            },
            {
              id: 3,
              title: 'Web Development Trends for 2025',
              startTime: '2025-06-15T11:00:00',
              endTime: '2025-06-15T12:00:00',
              speaker: 'John Doe, Lead Developer at WebWorks',
              location: 'Room A'
            },
            {
              id: 4,
              title: 'Lunch Break',
              startTime: '2025-06-15T12:00:00',
              endTime: '2025-06-15T13:30:00',
              location: 'Dining Area'
            },
            {
              id: 5,
              title: 'Workshop: Building AI-Powered Applications',
              startTime: '2025-06-15T13:30:00',
              endTime: '2025-06-15T15:30:00',
              speaker: 'Sarah Johnson, AI Specialist',
              location: 'Workshop Room 1'
            },
            {
              id: 6,
              title: 'Panel Discussion: Cybersecurity Challenges',
              startTime: '2025-06-15T16:00:00',
              endTime: '2025-06-15T17:00:00',
              speaker: 'Panel of Security Experts',
              location: 'Grand Ballroom'
            },
            {
              id: 7,
              title: 'Networking Reception',
              startTime: '2025-06-15T17:30:00',
              endTime: '2025-06-15T19:00:00',
              location: 'Terrace Lounge'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error || 'Event not found'}</p>
        </div>
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full bg-gray-800">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-2">
              <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDateRange(event.date, event.endDate)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Organized by {event.organizer.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-8 relative">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'details'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'schedule'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Schedule
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <div className="text-gray-700 space-y-4">
                      {event.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Location</h3>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{event.location}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              <a 
                                href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                View on Google Maps
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Organizer</h3>
                      <div className="flex items-center">
                        <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <Users className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">{event.organizer.name}</p>
                          <p className="text-sm text-gray-500">{event.organizer.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Share This Event</h3>
                      <div className="flex space-x-4">
                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                    {event.schedule && event.schedule.length > 0 ? (
                      <div className="space-y-6">
                        {event.schedule.map(item => (
                          <div key={item.id} className="border-l-4 border-indigo-500 pl-4 py-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                                {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            {item.speaker && (
                              <p className="text-gray-600 mt-1">Speaker: {item.speaker}</p>
                            )}
                            {item.location && (
                              <p className="text-gray-500 mt-1 text-sm flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {item.location}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-gray-700 mt-2">{item.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No schedule information available yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Tickets</h2>
              
              {event.tickets && event.tickets.length > 0 ? (
                <div className="space-y-4">
                  {event.tickets.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{ticket.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                        </div>
                        <span className="font-bold text-indigo-600">{formatPrice(ticket.price)}</span>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {ticket.quantity} tickets available
                        </span>
                        <Link
                          to={`/book/${event.id}?ticket=${ticket.id}`}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">Ticket information will be available soon.</div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>Event starts in {Math.floor((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Tickets are non-refundable but can be transferred to another person up to 24 hours before the event.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;