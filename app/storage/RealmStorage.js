var RealmBase = {};
import Realm from 'realm';

const HomeSchame = {
    name:'HomeData',
    properties:{
        id:'int',
        title:'string',
        image:'string',
        mall:'string',
    }
};

const HTSchame = {
    name:'HTData',
    properties:{
        id:'int',
        title:'string',
        image:'string',
        mall:'string',
    }
};

let realm = new Realm({schema:[HomeSchame,HTSchame]});

RealmBase.write = function (schame,data) {
    realm.write(()=>{
        for(let i = 0;i<data.length;i++){
            let temp = data[i];
            realm.create(schame,{id:temp.id,title:temp.title,image:temp.image,mall:temp.mall});
        }
    })
};

RealmBase.loadAll = function (schame) {
    return realm.objects(schame);
};

RealmBase.filtered = function (schame,filtered) {
    let objects = realm.objects(schame);
    let object = objects.filtered(filtered);
    if(object){
        return object;
    }
    return '未找到数据';
};

RealmBase.removeAll = function(schame){
    realm.write(()=>{
        let objects = realm.objects(schame);
        realm.delete(objects);
    });
};

export default RealmBase;