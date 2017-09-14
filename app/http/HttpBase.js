let HttpBase = {};


HttpBase.get=function (url, params, headers) {
    if(params){
        let paramsArray = [];
        let paramsKeyArray = Object.keys(params);
        paramsKeyArray.forEach(key=>paramsArray.push(key+'='+params[key]));
        if(url.search(/\?/) === -1){
            url += '?' + paramsArray.join('&');
        }else{
            url += paramsArray.join('&');
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url,{
            method:'GET',
            headers:headers,
        }).then((response)=>response.json())
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject({status:-1})
            })
            .done()
    });
};

HttpBase.post=function (url, params, headers) {
    if(params){
        var formData = new FormData();
        let paramsKeyArray = Object.keys(params);
        paramsKeyArray.forEach(key=>formData.append(key,params[key]));
    }
    return new Promise(function (resolve, reject) {
        fetch(url,{
            method:'POST',
            headers:headers,
            body:formData
        }).then((response)=>response.json())
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject({status:-1})
            })
            .done()
    });
};
GLOBAL.HttpBase = HttpBase;