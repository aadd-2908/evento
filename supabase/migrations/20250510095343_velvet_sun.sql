-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ORGANIZER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    image_url VARCHAR(255) NOT NULL,
    organizer_id BIGINT NOT NULL,
    ticket_price DOUBLE NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- Ticket Types Table
CREATE TABLE ticket_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Schedule Items Table
CREATE TABLE schedule_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    description TEXT,
    speaker VARCHAR(100),
    location VARCHAR(100),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Tickets Table
CREATE TABLE tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    ticket_type_id BIGINT,
    price DOUBLE NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    status ENUM('CONFIRMED', 'PENDING', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    ticket_code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id)
);

-- Payments Table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    amount DOUBLE NOT NULL,
    payment_date TIMESTAMP NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('COMPLETED', 'PENDING', 'FAILED') NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

-- Create indexes for better performance
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_featured ON events(featured);
CREATE INDEX idx_tickets_user ON tickets(user_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);