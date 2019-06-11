import mongodb from 'mongodb';
import mongoose from 'mongoose'

const config = {
    databaseURL: "localhost:27017/DatXe"
};

mongodb.Db(config);

export default mongodb;
export const database = mongodb.database();
