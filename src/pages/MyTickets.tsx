import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Download, XCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Ticket } from '../types/Event';
import { API_BASE_URL } from '../config/constants';
import { formatDate, formatPrice } from '../utils/formatters';

const MyTickets: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Failed to load tickets');
        
        // For demo purposes, set sample data
        setTickets([
          {
            id: 1,
            eventId: 1,
            userId: 1,
            ticketType: 'General Admission',
            price: 299.99,
            purchaseDate: '2025-03-15T10:30:00',
            status: 'CONFIRMED',
            ticketCode: 'TECH2025-GA-001'
          },
          {
            id: 2,
            eventId: 2,
            userId: 1,
            ticketType: 'VIP Pass',
            price: 499.99,
            purchaseDate: '2025-03-20T14:15:00',
            status: 'CONFIRMED',
            ticketCode: 'SUMMIT-VIP-002'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleCancelTicket = async (ticketId: number) => {
    if (!window.confirm('Are you sure you want to cancel this ticket?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to cancel ticket');
      }

      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    } catch (err) {
      console.error('Error canceling ticket:', err);
      setError('Failed to cancel ticket');
    }
  };

  const handleDownloadTicket = (ticketId: number) => {
    // In a real app, this would generate and download a PDF ticket
    console.log('Downloading ticket:', ticketId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Tickets Found</h2>
          <p className="text-gray-600 mb-4">
            You haven't purchased any tickets yet. Explore upcoming events and secure your spot!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {ticket.ticketType}
                    </h2>
                    <p className="text-gray-600 mb-4">Ticket #{ticket.ticketCode}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    ticket.status === 'CONFIRMED'
                      ? 'bg-green-100 text-green-800'
                      : ticket.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {ticket.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Purchased on {formatDate(ticket.purchaseDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>Event Location</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Event Time</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-gray-600">Price paid</span>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(ticket.price)}
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    {ticket.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleDownloadTicket(ticket.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    )}
                    
                    {ticket.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleCancelTicket(ticket.id)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;