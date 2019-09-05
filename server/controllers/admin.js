const resp = require('./response');
const fs = require('fs');


async function ChangeLogo(req, res){
    
    var file= req.file;
    var url= "./server/logo/logo.png"
    fs.writeFile(url, file.buffer, function(err) {
        if(err) {
            return resp.Error(res,'Oops... No se pudo cambiar la imagen')
        }	
        return resp.Success(res,'Archivo subido con exito')
    }); 
};

async function GetLogo(req, res){

    var url= "./server/logo/logo.png"

    fs.readFile(url, function read(err, data) {
        if (err) {
            resp.Error(res)
        }
        else{
            resp.Success(res,"Imagen",data)
        }
    });

};



module.exports = {

	ChangeLogo,
	GetLogo
}