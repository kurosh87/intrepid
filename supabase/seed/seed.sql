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

