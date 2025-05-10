import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config/constants';
import EventCard from '../components/EventCard';
import { Event } from '../types/Event';

const Home: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // In a real app, these would be separate endpoints
        const response = await fetch(`${API_BASE_URL}/api/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const events = await response.json();
        
        // Filter for featured events (in a real app, this would be a server-side filter)
        setFeaturedEvents(events.filter((event: Event) => event.featured).slice(0, 3));
        
        // Get upcoming events
        setUpcomingEvents(events.slice(0, 6));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
        
        // For demo purposes, create sample data
        const sampleEvents = generateSampleEvents();
        setFeaturedEvents(sampleEvents.filter(event => event.featured).slice(0, 3));
        setUpcomingEvents(sampleEvents.slice(0, 6));
      }
    };

    fetchEvents();
  }, []);

  // Function to generate sample events for demonstration
  const generateSampleEvents = (): Event[] => {
    return [
      {
        id: 1,
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.',
        location: 'San Francisco, CA',
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
        category: 'Technology'
      },
      {
        id: 2,
        title: 'Summer Music Festival',
        description: 'Three days of amazing music across multiple stages with the biggest artists in the industry.',
        location: 'Austin, TX',
        date: '2025-07-10T12:00:00',
        endDate: '2025-07-12T23:00:00',
        imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer: {
          id: 2,
          name: 'Music Festival Organizers',
          email: 'info@musicfestival.com'
        },
        ticketPrice: 199.99,
        featured: true,
        category: 'Music'
      },
      {
        id: 3,
        title: 'Marketing Summit',
        description: 'Learn the latest marketing strategies from industry experts and network with professionals.',
        location: 'New York, NY',
        date: '2025-05-05T08:30:00',
        endDate: '2025-05-07T17:00:00',
        imageUrl: 'https://images.pexels.com/photos/2962135/pexels-photo-2962135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer: {
          id: 3,
          name: 'Marketing Pros Association',
          email: 'summit@marketingpros.com'
        },
        ticketPrice: 249.99,
        featured: false,
        category: 'Business'
      },
      {
        id: 4,
        title: 'Food & Wine Festival',
        description: 'Taste exceptional cuisine and premium wines from renowned chefs and wineries.',
        location: 'Napa Valley, CA',
        date: '2025-08-20T11:00:00',
        endDate: '2025-08-22T20:00:00',
        imageUrl: 'https://images.pexels.com/photos/1267695/pexels-photo-1267695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer: {
          id: 4,
          name: 'Culinary Events',
          email: 'info@culinaryevents.com'
        },
        ticketPrice: 179.99,
        featured: true,
        category: 'Food & Drink'
      },
      {
        id: 5,
        title: 'Startup Pitch Competition',
        description: 'Watch innovative startups pitch their ideas to potential investors and win funding.',
        location: 'Boston, MA',
        date: '2025-04-12T09:00:00',
        endDate: '2025-04-12T18:00:00',
        imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer: {
          id: 5,
          name: 'Venture Capital Group',
          email: 'pitch@vcgroup.com'
        },
        ticketPrice: 49.99,
        featured: false,
        category: 'Business'
      },
      {
        id: 6,
        title: 'Yoga & Wellness Retreat',
        description: 'A weekend of yoga, meditation, and wellness activities to rejuvenate your mind and body.',
        location: 'Sedona, AZ',
        date: '2025-09-08T07:00:00',
        endDate: '2025-09-10T12:00:00',
        imageUrl: 'https://images.pexels.com/photos/8436741/pexels-photo-8436741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer: {
          id: 6,
          name: 'Mindful Living',
          email: 'retreat@mindfulliving.com'
        },
        ticketPrice: 349.99,
        featured: false,
        category: 'Health & Wellness'
      }
    ];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to a search results page
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Discover <span className="text-yellow-300">Events</span> that Match Your Interests
              </h1>
              <p className="text-xl opacity-90">
                Find and book tickets for conferences, workshops, concerts, and more.
                Or create your own event and reach thousands of attendees.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-8 relative">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="mt-2 sm:mt-0 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-r-md transition duration-300 ease-in-out"
                  >
                    Search
                  </button>
                </div>
              </form>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  to="/events" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Technology
                </Link>
                <Link 
                  to="/events" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Music
                </Link>
                <Link 
                  to="/events" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Business
                </Link>
                <Link 
                  to="/events" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Health & Wellness
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Event atmosphere" 
                className="rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
            <Link 
              to="/events" 
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View all 
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Events</h3>
              <p className="text-gray-600">
                Discover events that match your interests and location. Filter by category, date, or price.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Tickets</h3>
              <p className="text-gray-600">
                Securely purchase tickets online with just a few clicks. Receive instant confirmation and e-tickets.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Attend Events</h3>
              <p className="text-gray-600">
                Get reminders before the event. Easily check in with your digital ticket. Enjoy the experience!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View all 
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-green-500 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Host Your Own Event?</h2>
            <p className="text-xl opacity-90 mb-8">
              Create your event, sell tickets, and manage registrations all in one place.
            </p>
            <Link 
              to="/create-event" 
              className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Create Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;