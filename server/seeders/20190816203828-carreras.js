'use strict';
var carreras= [
  {nombre: "Arquitectura [Nueva]", sigla:"", createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Construcción Civil (vespertino)", sigla:"", createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Ingeniería Civil", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Ingeniería Civil Electrónica", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Ingeniería Civil Industrial", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {
    nombre: "Ingeniería Civil Informática",
    token:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChhJcmLDpViXHR\nM44OGhpO0h0J1mAXRlGMVbYqOnN3yXcqhUDI/VP5hXvM1w7kWkQMx/cPZTVgjUjy\nm9gQjRB7iyZu04jEzYCBIhhXSC44dwWmjR2hqFHU7zzbs+h4t4M1vO5gxn6ibDMy\nd6wn/7PE3sOEmc/QvIK0b2ZEABOFZmm/FGy2oaJ8OaBjS1JFUAuS62pg/X9zYezm\nO9AQXRe7a5kPyJFke0p0RaYWTRDbN4tU9fZigSaglcN4OxKZo01qMcJF+0XHx6rR\nJcpjBh5Q8Vuk2GyWCRLZXOTykApKeGWEs/xpM3zaqbjbxbyeDj1DeOMfG7b9glP2\nLGJe3QGxAgMBAAECggEACWRHELBqLO6ayGYVyMKiTHqBt0B4omnTlJQoTUDMVYcI\nr5eDepxmXWAyYGkR49vO0Kpw9nt1VNmqR/chY2b8ch6Xe8K/lWf4pKmZnjujemOL\nV9GlSzDZH0dQ89p8dkZ/cei8OLLaCrI9cN4OC95dsuEcH9H8yD+p3vmKSgJyICPK\ncWm0sYbQH8XBGGOo2zJ3+Lz3Bbk2GAfkwiwHry36FRjGLjzM1L4kouawnmDOTUoy\npDuyzqgEQuTXALNgViign35y5CGJhwmK61pwKbIYU4kX3dtjVzk9OaLf8xtXhB10\nn3ggfIWIpW3niorGZs4oNN3G6vwiN3NONHYmnmwUFQKBgQDScv5H0BqW7sHfUWg+\n8G1gu+FlFRSt1PDjrXiroBJla5CjVUhgHu2ya2J/819WCpLXiQPms5kPEu/qVNS7\nvE+0wR0TkF6mzdotgRUwOK0iYSk0VV95yAza3hkY6LPQq3Y9twNXpAjSf1gMG2Mb\nFY7PqOIj2sdEftbX6AihAbHqvQKBgQDEek/gdrVr8qWHQNPcIysbnlyVC6vVR9l2\nUKQ//AddvwdDHgKQdegOxP+ZAcOuR6IR9/VIebrepHcD2B4jCLnoKG3re9OP8KtO\nD0w0g/rVCBbK3Ar7IJNfm7r/0UbHTZ+sO+Edpc9O8jtbVbwzSb/NEBFyNmdYLAn6\nMsL2cl3cBQKBgQDPiwiq2djfMOeRzT75kzLLS36lqXyTUoWeg92VpG+ABezGp7yQ\nzu+sHasudF15BUR7u2xVgJlZ/FsOxkpmOviAUlLSkHZIGosohTzYKYzVcuyn5+oY\nt+m1j4NAxX1QNUiO5IYvUF5C+cNjbT733vLQaMVchs4uBsjqdLLN1lYYIQKBgQCZ\nH8oI4ftaee1Pj9KNiksaZz04W7Q7sJdmgkrAIyeKhEqgoE7XT0zf1eBt2tYqiWFi\nJ6FeLqDYy8yFjnVOUIqyyG+CSysCz0pyt7FobEOcq4U37G4ScbzpknEW1n8W7QQ4\nMyKq/IKowFhKQnM+dYepxZATNxsruIa+G7meYFuOEQKBgC7nbEJd33HX7rcAQ9Gp\ng6OBOPcc4ntdRizUJZoqHVzBUJJhBJfCF/n+IuO3vyBq2v89w7iE2wPCltj3GZub\nRi/Im6efFb7E5TjUkONhbIZy70hgep31HJ373bQW4PMHOhlSKvc+utgQfngx4OGd\nx6njHzDR+t3drkQDrnGbsgZg\n-----END PRIVATE KEY-----\n",
    correo: "backend-tesis@backend-tesis.iam.gserviceaccount.com",
    carpeta_id:"1UHrj2xyF7E1ug_OQAsfPfHYDZdpxoI1-",
    ubicacion:"GOOGLE",
    sigla:"INF",createdAt : new Date(),updatedAt : new Date(),
  },
  {nombre: "Ingeniería Ejecución en Computación e Informática (vespertino)", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {
    nombre: "Ingeniería en Construcción", 
    sigla:"ICO",createdAt : new Date(),updatedAt : new Date(),
    token:"iBumdY95utkAAAAAAAAA-sl12H42Sl7_bXiZTTtNjNx5zZmmCigSMLt7JgPojSkF",
    ubicacion:"DROPBOX",
  },
  
  {nombre : "Medicina", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Química y Farmacia", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  
  {nombre : "Enfermería Talca", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Enfermería - Curicó", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre : "Kinesiología", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Nutrición y Dietética", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Psicología", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Tecnología Médica", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  
  
  {nombre : "Educación Parvularia - Curicó", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Educación Especial", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre : "Pedagogía en Educación Física", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Educación General Básica con Mención - Curicó", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Educación General Básica con Mención - Talca", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Inglés", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Lengua Castellana y Comunicación", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  
  
  {nombre : "Administración Pública", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre:  "Auditoría (Vespertino) Talca", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre : "Auditoría (Vespertino) Curicó", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Derecho", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Ingeniería Comercial", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Sociología", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Trabajo Social - Talca", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Trabajo Social - Curicó", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  
  
  {nombre: "Ingeniería en Estadística", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Ciencias", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  {nombre: "Pedagogía en Matemáticas y Computación", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  
  {nombre: "Pedagogía en Religión y Filosofía", sigla:"",createdAt : new Date(),updatedAt : new Date(),},
  
  ]
  

  
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.bulkInsert('Carreras', carreras, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carreras', null, {});
  }
};






















