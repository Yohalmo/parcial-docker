# Parcial Docker Integrado - Ejercicio 1
# Servicio base con Node.js y Docker

Comandos utilizados:

docker build -t parcial-api .
docker run -d --name parcial-api -p 3000:3000 parcial-api

curl http://localhost:3000/
curl http://localhost:3000/health

docker ps
docker images parcial-api
docker logs -f parcial-api


#Creacion de la db y el volumen

docker volume create db_data

docker run -d \
  --name parcial-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=12345 \
  -e POSTGRES_DB=parcial_db \
  -v db_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15-alpine

#Acceder a postgres para crear la tabla

docker exec -it parcial-db psql -U admin -d parcial_db

#crear la tabla en la db
CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  carrera VARCHAR(100),
  codigo VARCHAR(100),
  expediente VARCHAR(100)
);

#agregar registros
INSERT INTO estudiantes (nombre, carrera, codigo, expediente) VALUES ('Yohalmo Vásquez', 'Ingeniería en Sistemas Computacionales','vg20i04001', '24569');

#verificar regsitros
SELECT * FROM estudiantes;

#reiniciar servicio y verificar persistencia
docker restart parcial-db
docker exec -it parcial-db psql -U admin -d parcial_db -c "SELECT * FROM estudiantes;"

