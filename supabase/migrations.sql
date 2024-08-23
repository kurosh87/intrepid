-- Continents
CREATE TABLE continents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Continental Regions
CREATE TABLE continental_regions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  continent_id INTEGER REFERENCES continents(id)
);

-- Countries
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  continental_region_id INTEGER REFERENCES continental_regions(id)
);

-- Country Regions
CREATE TABLE country_regions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_id INTEGER REFERENCES countries(id)
);

-- Cities
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_region_id INTEGER REFERENCES country_regions(id),
  latitude FLOAT,
  longitude FLOAT
);

-- Points of Interest
CREATE TABLE points_of_interest (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city_id INTEGER REFERENCES cities(id),
  type TEXT,
  description TEXT,
  latitude FLOAT,
  longitude FLOAT
);
