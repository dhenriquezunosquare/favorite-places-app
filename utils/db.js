import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

export const database = SQLite.openDatabase('places.db');

export const init = () => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`create table if not exists places (
                id integer primary key not null,
                title text not null,
                imageUri text not null,
                address text not null,
                lat real not null,
                lng real not null
            )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                },
            )
        })
    });

    return promise;
};

export const insertPlace = (place) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(` insert into places (title, imageUri,address,lat,lng) values (?,?,?,?,?)`,
                [place.title, place.imageUrl, place.address, place.location.lat, place.location.lng],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                },
            )
        })
    });

    return promise;
}

export const fecthPlaces = () => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql("SELECT * FROM places", [],
                (_, result) => {
                    const places = [];
                    for (const dp of result.rows._array) {
                        places.push(new Place(dp.title, dp.imageUri, dp.address, { lat: dp.lat, lng: dp.lng }, dp.id));
                    }
                    resolve(places);
                },
                (_, error) => reject(error));
        })
    })

    return promise;
};


export const fecthPlacesbyID = (id) => { 

    const promise = new Promise((resolve, reject) => {
        database.transaction( (tx)=>{
            tx.executeSql(`select * from places where id = ?`, [id],
            (_,result)=>{
                resolve(result.rows._array[0]);
            },
            (_, error)=>{
                reject(error);
            }
            )
        })
    });

    return promise;
}