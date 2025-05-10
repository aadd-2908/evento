import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket, CreditCard, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Event } from '../types/Event';
import { API_BASE_URL } from '../config/constants';
import { formatPrice } from '../utils/formatters';

const BookTicket: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
        
        // For demo purposes, set sample data
        setEvent({
          id: parseInt(id || '1'),
          title: 'Tech Conference 2025',
          description: 'Join us for the biggest tech conference of the year',
          location: 'San Francisco, CA',
          date: '2025-06-15T09:00:00',
          imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
          organizer: {
            id: 1,
            name: 'TechEvents Inc.',
            email: 'contact@techevents.com'
          },
          ticketPrice: 299.99,
          category: 'Technology',
          tickets: [
            {
              id: 1,
              name: 'General Admission',
              price: 299.99,
              quantity: 100,
              description: 'Access to all conference sessions'
            },
            {
              id: 2,
              name: 'VIP Pass',
              price: 499.99,
              quantity: 50,
              description: 'Premium seating and exclusive networking events'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          eventId: id,
          ticketTypeId: selectedTicketType,
          quantity
        })
      });

      if (!response.ok) {
        throw new Error('Failed to purchase ticket');
      }

      const data = await response.json();
      navigate(`/my-tickets`);
    } catch (err) {
      console.error('Error purchasing ticket:', err);
      setError('Failed to purchase ticket. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">Event not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Tickets</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{event.title}</h2>
          <div className="flex items-center text-gray-600 mb-4">
            <Ticket className="h-5 w-5 mr-2" />
            <span>Select your tickets</span>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handlePurchase} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Type
              </label>
              {event.tickets?.map((ticket) => (
                <div key={ticket.id} className="mb-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="ticketType"
                      value={ticket.id}
                      checked={selectedTicketType === String(ticket.id)}
                      onChange={(e) => setSelectedTicketType(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      required
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{ticket.name}</span>
                        <span className="text-indigo-600 font-semibold">
                          {formatPrice(ticket.price)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{ticket.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {ticket.quantity} tickets available
                      </p>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">
                  {formatPrice(
                    quantity * 
                    (event.tickets?.find(t => String(t.id) === selectedTicketType)?.price || 0)
                  )}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !selectedTicketType}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Tickets are non-refundable</li>
          <li>• You can transfer tickets up to 24 hours before the event</li>
          <li>• Please bring a valid ID for check-in</li>
          <li>• Ticket confirmation will be sent to your email</li>
        </ul>
      </div>
    </div>
  );
};

export default BookTicket;