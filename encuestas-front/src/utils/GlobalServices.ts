import axios from 'axios';

export async function consultaEncuestas(){
        var jsonResponse = {
        status: 0,
        message: '',
        errorCode: '',
        data: []
    }
    const urlService = 'http://localhost:3000/encuesta';
    let algo = await axios({
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
        return jsonResponse;
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
        return jsonResponse;
    });

    console.log('*_* esto es algo: ', algo);
    return jsonResponse;
}


export function sumar(): number {
    let valor1:number = 5;
    let valor2:number = 5;
    return valor1+valor2;
}