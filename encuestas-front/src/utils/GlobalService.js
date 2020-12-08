import axios from 'axios';

export function _consultaLogin( data){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/usuario/login';
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "post",
            url: urlService,
            data: JSON.stringify(data)
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = res.data.message;
                jsonResponse.data = res.data.response;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _consultaEncuestas(){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/encuesta';
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            url: urlService,
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = res.data.message;
                jsonResponse.data = res.data.response;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _consultaFormulariosActivos(){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/formulario/formulariosActivos';
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            url: urlService,
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = res.statusText;
                jsonResponse.data = res.data;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _consultaFormulariosActivosIdentificador(identificador){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/formulario/formulariosActivos/' + identificador;
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            url: urlService,
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = res.statusText;
                jsonResponse.data = res.data;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _nuevaEncuesta(data){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/respFormulario/nuevaEncuesta';
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "post",
            url: urlService,
            data: JSON.stringify(data)
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = '';
                jsonResponse.data = res.data;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _consultaUsuarios(){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/usuario';
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            url: urlService,
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = res.data.mensaje;
                jsonResponse.data = res.data.response;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _consultaResFormByIdUser(id){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/respFormulario/' + id;
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            url: urlService,
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = '';
                jsonResponse.data = res.data;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _consultaResFormByIdEncuesta(id){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/respFormulario/idEncuesta/' + id;
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            url: urlService,
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = '';
                jsonResponse.data = res.data;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}

export function _nuevaRespuesta(data){
    return new Promise ((resolve, reject) => {
        var jsonResponse = {
            status: 0,
            message: '',
            data: null
        }
        const urlService = 'http://localhost:3000/respFormulario/setRespuesta';
        axios({
            headers: {
              "Content-Type": "application/json"
            },
            method: "post",
            url: urlService,
            data: JSON.stringify(data)
          })
            .then(res => {
                jsonResponse.status = res.status;
                jsonResponse.message = '';
                jsonResponse.data = res.data;
                resolve(jsonResponse);
            })
            .catch(error => {
              if (error.response === undefined) {
                jsonResponse.message = error + "";
                jsonResponse.status = 0;
              } else {
                jsonResponse.message = error.response.statusText;
                jsonResponse.status = error.response.status;
                jsonResponse.errorCode = error.response.data.errorCode;
              }
              reject(jsonResponse);
            });
    });
}