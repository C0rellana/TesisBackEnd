// const request = require('request');

// function clean() {
//     return new Promise(function (resolve, reject) {

//         const url = 'https://login.microsoftonline.com/common/oauth2/token';
    
//         const username = 'carlos.orellana@alu.ucm.cl'; // Username of PowerBI "pro" account - stored in config
//         const password = 'Carlos19951995'; // Password of PowerBI "pro" account - stored in config
//         const clientId = '4eac6a13-a811-406e-9bbf-86789ae4e2fc';
    

// //         id: app:
// // 73674c94-f7e0-496a-acb9-5b91f4f8456f

// // id secret app : BXPaPwB4XRU4aKica05/DT9R/qdNBJN0HWjH85/NBxQ=

// //        
//      const headers = {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         };
    
//         const formData = {
//             grant_type: 'password',
//             client_id: clientId,
//             resource: 'https://analysis.windows.net/powerbi/api',
//             scope: 'openid',
//             username: username,
//             password: password
//         };
    
//         request.post({
//             url: url,
//             form: formData,
//             headers: headers
//         }, function (err, result, body) {
           
//             if (err) return reject(err);
//             const bodyObj = JSON.parse(body);
//             console.log(bodyObj)
//             resolve(bodyObj.access_token);
//         });
//        });
  
 

// }




// clean();