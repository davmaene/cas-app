import axios from 'axios';
import { endpoint } from '../assets/configs/configs';
import { db } from './dbconnect/dbconnect';

import { OnInitialize } from './tables/tables';

OnInitialize(); // initialize tables and create them if not exist

axios.interceptors.request.use(
    config => {
        // config.headers.accesskey = "$2b$10$AS6GbX37SkQS6skhMOYjveDOuUUgvGz9dvsrCbeylWl/SwMkDDp2G";
        // config.headers.apikeyaccess = "p@yondego.zaq2022";
        return config;
    },
    rejected => {
        return new Promise.reject(rejected)
    }
);

axios.interceptors.response.use(
    (resposne) => {
        return resposne;
    }
    , error => {
        const er = error.response ? error.response : undefined;
        return er ? er : new Promise.reject(error)
    });

export const timeout = 25000;

export const onRunInsertQRY = async ({ columns, dot, table, values, options }, cb) => {
    try {
        db.transaction(
            (tx) => {
                tx.executeSql(`insert into ${table} (${columns}) values (${dot})`, values);
                tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                    cb(undefined, rows['_array'][0])
                });
            },
            (err) => {
                cb(err, undefined)
            }
        );
    } catch (error) {
        return cb(error, undefined)
    }
};

export const onRunRawQRY = async ({ table, sql, options }, cb) => {
    try {
        db.transaction(
            (tx) => {
                tx.executeSql(`${sql}`, null,
                    (d => {
                        cb(undefined, d)
                    }), e => {
                        cb(e, undefined)
                    })
            });
    } catch (error) {
        return cb(error, undefined)
    }
};

export const onRunRemoveQRY = async ({ table, clause }, cb) => {
    try {
        // DELETE FROM `__tbl_users` WHERE `__tbl_users`.`id` = 1 » ?
        db.transaction(
            (tx) => {
                tx.executeSql(`delete from ${table} where id <> 0`, null,
                    (line) => {
                        cb(undefined, 'done')
                    },
                    (err) => cb(err, undefined)
                )
            });
    } catch (error) {
        return cb(error, undefined)
    }
};

export const onRunRetrieveQRY = async ({ table, limit }, cb) => {
    limit = limit ? limit : 1;
    try {
        db.transaction(
            (tx) => {
                tx.executeSql(`select * from ${table} limit ${limit}`, [], (_, { rows }) => {
                    cb(undefined, rows['_array'] && rows['_array']['length'] ? rows['_array'] : [])
                }, (err) => {
                    cb(err, undefined)
                });
            }
            , (err) => {
                cb(err, undefined)
            }
        );
    } catch (error) {
        cb(error, undefined)
    }
};

export const onRunExternalRQST = async ({ url, data, method, type }, cb) => {
    try {
        try {
            await fetch(`${endpoint}${url}`, {
                method,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                body: data ? data : null
            }).then(reponse => reponse.json())
                .then(data => {
                    return cb(undefined, data)
                })
                .catch(err => {
                    return cb(err, undefined)
                })
        } catch (error) {
            setIsLoading(false);
            handleError(error);
        }
        // await axios({
        //     timeout,
        //     method: method ? method : "GET",
        //     data: data || null,
        //     url: `${endpoint}${url}`,
        //     // headers: {
        //     //     'Content-type': 'application/x-www-form-urlencoded'
        //     // }
        //     // headers: {
        //     //     ...type
        //     // }
        // })
        //     .then(res => {
        //         return cb(undefined, res['data'])
        //     })
        //     .catch(err => {
        //         return cb(err, undefined)
        //     })
    } catch (error) {
        return cb(error, undefined)
    }
};



