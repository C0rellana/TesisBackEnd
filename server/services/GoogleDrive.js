var {google} = require('googleapis');

const drive = google.drive('v3');



function GetToken(correo,token){
  return new google.auth.JWT(
    correo,
    null,
    token,
    ['https://www.googleapis.com/auth/drive'],
    null
  );
}

function DriveList(correo,token){
    
    const jwtClient= GetToken(correo,token);

    drive.files.list({ auth:jwtClient}).then(list=> {
      console.log(list.data.files)
    }).catch(err=> {
      console.log(err)
    });

}

async function DriveUpload(correo,token,nombre_archivo,carpeta_id,archivo,mimeType){
   
    const jwtClient= GetToken(correo,token);

    const fileMetadata = {
      name: nombre_archivo, //Nombre del archivo
      parents:[carpeta_id] //carpeta compartida.
    };
      
    const media = {
      mimeType: mimeType, //Aceptar cualquier tipo
      body: archivo, //archivo de entrada
    };

    try {
      const file = await drive.files.create({
        auth: jwtClient,
        resource: fileMetadata,
        media,
        fields: 'id'
      });
      try {
        await drive.permissions.create({
          fileId: file.data.id,
          auth: jwtClient,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          }
        });
        //console.log("Permisos para cualquier usuario concedido")
        //console.log("id:",file.data.id)
        return {success:true,data:file.data.id, message:"Permisos para cualquier usuario concedido"};
      }
      catch (err) {
        //console.log("Permisos para cualquier usuario denegado")
        return {success:false,data:err,message:"Permisos para cualquier usuario denegado"};
        
      }
    }
    catch (err_1) {
      //console.log("Error al subir el archivo",err)
      return {success:false,data:err_1,message:"Error al subir el archivo"};
  
    }
}
    
function DriveNewFolder(correo,token,nombre_carpeta){
 
    const jwtClient= GetToken(correo,token);

    var fileMetadata = {
        'name' : nombre,
        'mimeType' : 'application/vnd.google-apps.folder',
    
    };

    drive.files.create({
      resource: fileMetadata,
      fields: 'id',
      auth:jwtClient,
    }).then(carpeta=>{
        console.log('Carpeta creada con Id: ', carpeta.data.id);
        var userPermission = {
          'type': 'user',
          'role': 'writer',
          'emailAddress': 'carlosmof15@gmail.com' //compartir conmigo.
        };
        drive.permissions.create({
          resource: userPermission,
          fileId: carpeta.data.id,
          fields: 'id',
          auth: jwtClient
        }).then(res=>{
          console.log('Permission creado: ' + res.id + ' al elemento con id: ' + file.id);
        }).catch(err=>{
          console.error('Error asignado permisos a la  carpeta: ' + err);
        });
    }).catch(err=>{
      console.error('Error creando carpeta: ' + err);
    });
}

async function GetFile(correo,token,id) {
    //obtener token de seguridad
    const jwtClient= GetToken(correo,token);
    //obtener link del archivo.
    try {
      const res = await drive.files.get({
        fileId: id,
        auth: jwtClient,
        fields: 'webContentLink',
    });
    return { success: true, data: res.data, message: "Enlace generado" };
  }
  catch (err) {
    throw ( { success: false, data: err, message: "Error al descargar el archivo" });
 
  }
}

module.exports ={
  DriveList,
  DriveUpload,
  DriveNewFolder,
  GetFile,
} 
