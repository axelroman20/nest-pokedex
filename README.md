<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar el comando de
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

1. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

2. LLenar las variables de entorno definidas en el archivo ```.env```

3. Ejecutar la aplicación en dev:
```
yarn start:dev
```

1. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

# Producción Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack usado
* MongoDB
* Nest


# Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Trigger Heroku deploy"
git push heroku main
```