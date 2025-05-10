/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format a price to currency format
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

/**
 * Format a date range (start to end)
 */
export const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  
  if (!endDate) {
    return formatDate(startDate);
  }
  
  const end = new Date(endDate);
  
  // If same day
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(startDate)} · ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Different days
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};