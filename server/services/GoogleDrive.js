var {google} = require('googleapis');
const fs = require('fs');
//const key = require(__dirname+'/my_credentials.json');
const drive = google.drive('v3');

var token= "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChhJcmLDpViXHR\nM44OGhpO0h0J1mAXRlGMVbYqOnN3yXcqhUDI/VP5hXvM1w7kWkQMx/cPZTVgjUjy\nm9gQjRB7iyZu04jEzYCBIhhXSC44dwWmjR2hqFHU7zzbs+h4t4M1vO5gxn6ibDMy\nd6wn/7PE3sOEmc/QvIK0b2ZEABOFZmm/FGy2oaJ8OaBjS1JFUAuS62pg/X9zYezm\nO9AQXRe7a5kPyJFke0p0RaYWTRDbN4tU9fZigSaglcN4OxKZo01qMcJF+0XHx6rR\nJcpjBh5Q8Vuk2GyWCRLZXOTykApKeGWEs/xpM3zaqbjbxbyeDj1DeOMfG7b9glP2\nLGJe3QGxAgMBAAECggEACWRHELBqLO6ayGYVyMKiTHqBt0B4omnTlJQoTUDMVYcI\nr5eDepxmXWAyYGkR49vO0Kpw9nt1VNmqR/chY2b8ch6Xe8K/lWf4pKmZnjujemOL\nV9GlSzDZH0dQ89p8dkZ/cei8OLLaCrI9cN4OC95dsuEcH9H8yD+p3vmKSgJyICPK\ncWm0sYbQH8XBGGOo2zJ3+Lz3Bbk2GAfkwiwHry36FRjGLjzM1L4kouawnmDOTUoy\npDuyzqgEQuTXALNgViign35y5CGJhwmK61pwKbIYU4kX3dtjVzk9OaLf8xtXhB10\nn3ggfIWIpW3niorGZs4oNN3G6vwiN3NONHYmnmwUFQKBgQDScv5H0BqW7sHfUWg+\n8G1gu+FlFRSt1PDjrXiroBJla5CjVUhgHu2ya2J/819WCpLXiQPms5kPEu/qVNS7\nvE+0wR0TkF6mzdotgRUwOK0iYSk0VV95yAza3hkY6LPQq3Y9twNXpAjSf1gMG2Mb\nFY7PqOIj2sdEftbX6AihAbHqvQKBgQDEek/gdrVr8qWHQNPcIysbnlyVC6vVR9l2\nUKQ//AddvwdDHgKQdegOxP+ZAcOuR6IR9/VIebrepHcD2B4jCLnoKG3re9OP8KtO\nD0w0g/rVCBbK3Ar7IJNfm7r/0UbHTZ+sO+Edpc9O8jtbVbwzSb/NEBFyNmdYLAn6\nMsL2cl3cBQKBgQDPiwiq2djfMOeRzT75kzLLS36lqXyTUoWeg92VpG+ABezGp7yQ\nzu+sHasudF15BUR7u2xVgJlZ/FsOxkpmOviAUlLSkHZIGosohTzYKYzVcuyn5+oY\nt+m1j4NAxX1QNUiO5IYvUF5C+cNjbT733vLQaMVchs4uBsjqdLLN1lYYIQKBgQCZ\nH8oI4ftaee1Pj9KNiksaZz04W7Q7sJdmgkrAIyeKhEqgoE7XT0zf1eBt2tYqiWFi\nJ6FeLqDYy8yFjnVOUIqyyG+CSysCz0pyt7FobEOcq4U37G4ScbzpknEW1n8W7QQ4\nMyKq/IKowFhKQnM+dYepxZATNxsruIa+G7meYFuOEQKBgC7nbEJd33HX7rcAQ9Gp\ng6OBOPcc4ntdRizUJZoqHVzBUJJhBJfCF/n+IuO3vyBq2v89w7iE2wPCltj3GZub\nRi/Im6efFb7E5TjUkONhbIZy70hgep31HJ373bQW4PMHOhlSKvc+utgQfngx4OGd\nx6njHzDR+t3drkQDrnGbsgZg\n-----END PRIVATE KEY-----\n";
var correo= "backend-tesis@backend-tesis.iam.gserviceaccount.com";


function DriveList(correo,token){
    
    const jwtClient = new google.auth.JWT(
        correo,
        null,
        token,
        ['https://www.googleapis.com/auth/drive'],
        null
    );
    
    jwtClient.authorize((authErr,result) => {
      if (authErr) {
        console.log(authErr);
        return;
      }
 
        drive.files.list({ auth:jwtClient}, (listErr, resp) => {
          if (listErr) {
            console.log(listErr);
            return;
          }
         console.log(resp.data.files)
        });
    
    });
 
}



function DriveUpload(correo,token,nombre,archivo){
   
  const jwtClient = new google.auth.JWT(
      correo,
      null,
      token,
      ['https://www.googleapis.com/auth/drive'],
      null
  );

  jwtClient.authorize((authErr,result) => {
    if (authErr) {
      console.log(authErr);
      return;
    }

    const fileMetadata = {
        name: nombre,
        parents:["1UHrj2xyF7E1ug_OQAsfPfHYDZdpxoI1-"] //carpeta
      };
      
      const media = {
        mimeType: 'text/plain', //tipo
        body: fs.createReadStream(__dirname+"/11111111-1.png") //archivo
      };

      drive.files.create({
         auth:jwtClient,
        resource: fileMetadata,
        media,
        fields: 'id'
      }, (err, file) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Uploaded File Id: ', file.id); //ID DEL ARCHIVO
      });
      
    });
}
    
function DriveNewFolder(correo,token,nombre){
  const jwtClient = new google.auth.JWT(
    correo,
    null,
    token,
    ['https://www.googleapis.com/auth/drive'],
    null
  );

  jwtClient.authorize((authErr,result) => {
    if (authErr) {
      console.log(authErr);
      return;
    }

    var fileMetadata = {
        'name' : nombre,
        'mimeType' : 'application/vnd.google-apps.folder',
    
    };

    drive.files.create({
    resource: fileMetadata,
    fields: 'id',
    auth:jwtClient,
    }, function(err, file) {
    if(err) {
        // Handle error
        console.error('Error creando carpeta: ' + err);
    } else {
        console.log('Carpeta creada con Id: ', file.data.id);
        var userPermission = {
            'type': 'user',
            'role': 'writer',
            'emailAddress': 'carlosmof15@gmail.com' //compartir conmigo.
        };
        drive.permissions.create({
            resource: userPermission,
            fileId: file.data.id,
            fields: 'id',
            auth: jwtClient
        }, function(err, res) {
            if (err) {
                // Handle error
                console.error('Error creando permiso: ' + err);
            } else {
                console.log('Permission creado: ' + res.id + ' al elemento con id: ' + file.id);
            }
        });
    }
    });
  });

}


DriveList(correo,token);



function GetFile(correo,token,id) {

    const jwtClient = new google.auth.JWT(
      correo,
      null,
      token,
      ['https://www.googleapis.com/auth/drive'],
      null
    );

    jwtClient.authorize((authErr,result) => {
      if (authErr) {
        console.log(authErr);
        return;
      }

    drive.files.get(
      {
      fileId: id,
      alt: 'media',
      auth:jwtClient,
      },
      {responseType: 'stream'},

      function(err, res){
          console.log(err)
            res.data
            .on('end', () => {
                console.log('Done');
            })
            .on('error', err => {
                console.log('Error', err);
            })
            .pipe(dest);
        }
    );
  });
}
GetFile(correo,token,"10bLrvc1Gxp1hUFcWu9Ph2Wh6EjkeuCBP")
