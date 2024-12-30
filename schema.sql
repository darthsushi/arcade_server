CREATE DATABASE arcade;

USE arcade;

CREATE TABLE users (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  name VARCHAR(50) NOT NULL, -- Nombre del usuario
  nickname VARCHAR(20) NOT NULL, -- Nombre de usuario de no más de 20 caracteres
  experience INT UNSIGNED DEFAULT 0, -- Número igual o mayor a 0
  level INT UNSIGNED DEFAULT 0, -- Número igual o mayor a 0
  free_coin INT UNSIGNED DEFAULT 0, -- Número igual o mayor a 0
  coin INT UNSIGNED DEFAULT 0, -- Número igual o mayor a 0
  is_dev BOOLEAN DEFAULT FALSE, -- 0 para no, 1 para sí
  has_access BOOLEAN DEFAULT FALSE,
  weapon_1 BOOLEAN DEFAULT false,
  weapon_2 BOOLEAN DEFAULT false,
  weapon_3 BOOLEAN DEFAULT false,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT (NOW()), -- Fecha de creación asignada automáticamente
  UNIQUE (nickname) -- Garantiza que los apodos no se repitan
);
