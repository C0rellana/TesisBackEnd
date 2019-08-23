var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;

function DropboxList(TOKEN){

    var dbx = new Dropbox({ accessToken: TOKEN, fetch: fetch });
    return dbx.filesListFolder({path: ''})
    .then(function(response) {
        return true;
    })
    .catch(function(error) {
        return false;
  });

}

function DropboxUpload(TOKEN,nombre,file){
    var dbx = new Dropbox({ accessToken: TOKEN, fetch: fetch });
    
    return dbx.filesUpload({path: '/' + nombre, contents: file})
    .then(function(response) {
        return true;
    })
    .catch(function(error) {
        return false;
    });
}

var GetFile = function(token,nombre) {
        return new Promise(function(resolve, reject) {
            var dbx = new Dropbox({ accessToken: token, fetch: fetch });
        
            dbx.filesGetTemporaryLink({path:"/"+nombre})
            .then(function(response) {
                resolve(response.link);
            })
            .catch(function(error) {
                reject(Error(error))
        });
        });
    };



module.exports ={
    DropboxUpload,
    DropboxList,
    GetFile
} 
