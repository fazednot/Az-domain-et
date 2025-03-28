/*
  # Initial Schema Setup

  1. New Tables
    - users (handled by Supabase Auth)
    - domains
      - id (uuid, primary key)
      - name (text)
      - extension (text)
      - status (text)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
      - expires_at (timestamp)
    - cart_items
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - domain_name (text)
      - extension (text)
      - price (numeric)
      - created_at (timestamp)
    - orders
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - total_amount (numeric)
      - status (text)
      - created_at (timestamp)
    - blog_posts
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - author_id (uuid, foreign key)
      - created_at (timestamp)
    - contact_messages
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - message (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Domains table
CREATE TABLE domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  extension text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  UNIQUE(name, extension)
);

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all domains"
  ON domains FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own domains"
  ON domains FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Cart items table
CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  domain_name text NOT NULL,
  extension text NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own cart"
  ON cart_items FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authors can manage their posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (auth.uid() = author_id);

-- Contact messages table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  TO authenticated
  WITH CHECK (true);