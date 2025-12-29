-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) NOT NULL DEFAULT 'customer', -- 'customer' or 'media_company'
    
    -- Customer fields
    name VARCHAR(255),
    phone VARCHAR(50),
    
    -- Media company fields
    company_name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    
    -- Agreement checkboxes
    terms_accepted BOOLEAN DEFAULT FALSE,
    collection_accepted BOOLEAN DEFAULT FALSE,
    promotion_accepted BOOLEAN DEFAULT FALSE,
    
    -- Password reset fields
    reset_token VARCHAR(255),
    reset_expires TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_reset_token ON users(reset_token);

-- Sessions table (optional, for token-based auth)
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
