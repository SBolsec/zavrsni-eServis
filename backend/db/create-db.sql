CREATE TABLE Uloga
(
  sif_uloga SERIAL PRIMARY KEY,
  naziv_uloga VARCHAR(100) NOT NULL
);

CREATE TABLE Korisnik
(
  sif_korisnik SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  lozinka VARCHAR NOT NULL,
  sif_uloga INT NOT NULL REFERENCES Uloga(sif_uloga),
  verzija_tokena INT NOT NULL DEFAULT 0,
  trenutak_stvaranja TIMESTAMP,
  trenutak_promjene TIMESTAMP
);

CREATE TABLE Osoba
(
  sif_osoba SERIAL PRIMARY KEY,
  ime VARCHAR NOT NULL,
  prezime VARCHAR NOT NULL,
  sif_korisnik INT NOT NULL REFERENCES Korisnik(sif_korisnik) ON DELETE CASCADE,
  trenutak_stvaranja TIMESTAMP,
  trenutak_promjene TIMESTAMP
);

CREATE TABLE Mjesto 
(
  sif_mjesto SERIAL PRIMARY KEY,
  naziv_mjesto VARCHAR NOT NULL,
  postanski_broj INT NOT NULL
);

CREATE TABLE Servis
(
  sif_servis SERIAL PRIMARY KEY,
  naziv_servis VARCHAR NOT NULL,
  oib VARCHAR(11) NOT NULL UNIQUE,
  telefon VARCHAR NOT NULL,
  adresa VARCHAR NOT NULL,
  sif_mjesto INT NOT NULL REFERENCES Mjesto(sif_mjesto) ON DELETE CASCADE,
  sif_korisnik INT NOT NULL REFERENCES Korisnik(sif_korisnik) ON DELETE CASCADE,
  trenutak_stvaranja TIMESTAMP,
  trenutak_promjene TIMESTAMP
);

INSERT INTO uloga (naziv_uloga) VALUES ('admin');
INSERT INTO uloga (naziv_uloga) VALUES ('obican');
INSERT INTO uloga (naziv_uloga) VALUES ('serviser');