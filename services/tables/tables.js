import * as SQLite from "expo-sqlite";
import { db } from '../dbconnect/dbconnect';

export const OnInitialize = () => {

    // table historique
    const __tbl_historiques = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS __tbl_historiques (
                    id integer primary key not null,
                    alertto varchar(100) NOT NULL,
                    content varchar(60) NOT NULL,
                    userid varchar(60) NOT NULL
                    crearedon varchar(60) NOT NULL
                )`
            )
        })
    };

    // table chats
    const __tbl_chats = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS __tbl_chats (
                    id integer primary key not null,
                    content varchar(200) NOT NULL,
                    fill varchar(60) NOT NULL,
                    from_ varchar(60) NOT NULL,
                    from_token varchar(60) NOT NULL,
                    to_ varchar(60) NOT NULL,
                    to_token varchar(60) NOT NULL,
                    crearedon varchar(60) NOT NULL
                )`
            )
        }, 
            er => console.log(er)
        )
    };

    // table user
    const __tbl_users = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS __tbl_users (
                    id integer primary key not null,
                    userid integer NOT NULL,
                    username varchar(100) NOT NULL,
                    fullname varchar(60) NOT NULL,
                    photo varchar(60) NOT NULL,
                    designationid varchar(60) NOT NULL,
                    shops varchar(60) NOT NULL,
                    crearedon varchar(60) NOT NULL
                )`
            )
        })
    };

    __tbl_chats();
    __tbl_historiques();
    __tbl_users();
}
