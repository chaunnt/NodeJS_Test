/**
 * Created by Huu on 11/18/21.
 */

"use strict";
require("dotenv").config();

const Logger = require('../../../utils/logging');
const { DB, timestamps } = require("../../../config/database");
const Common = require('../../Common/resourceAccess/CommonResourceAccess');
const tableName = "RealEstateReport";
const primaryKeyField = "realEstateReportId";
async function createTable() {
    Logger.info('ResourceAccess', `createTable ${tableName}`);
    return new Promise(async (resolve, reject) => {
        DB.schema.dropTableIfExists(`${tableName}`).then(() => {
            DB.schema
                .createTable(`${tableName}`, function (table) {
                    table.increments(`${primaryKeyField}`).primary();
                    table.string('reportTitle');
                    table.string('reportcontent');
                    table.string('reportEmail');
                    table.string('reportPhoneNumber');
                    table.integer('appUserId');
                    table.integer('realEstateId');
                    timestamps(table);
                    table.index(`${primaryKeyField}`);
                    table.index('reportTitle');
                    table.index('reportcontent');
                    table.index('reportEmail');
                    table.index('reportPhoneNumber');
                    table.index('appUserId');
                })
                .then(async () => {
                    Logger.info(`${tableName}`, `${tableName} table created done`);
                    resolve();
                });
        });
    });
}

async function initDB() {
    await createTable();
}

async function insert(data) {
    return await Common.insert(tableName, data);
}

async function updateById(id, data) {
    let dataId = {};
    dataId[primaryKeyField] = id;
    return await Common.updateById(tableName, dataId, data);
}

async function find(filter, skip, limit, order) {
    return await Common.find(tableName, filter, skip, limit, order);
}

async function count(filter, order) {
    return await Common.count(tableName, primaryKeyField, filter, order);
}
async function deleteById(id) {
    let dataId = {};
    dataId[primaryKeyField] = id;
    return await Common.deleteById(tableName, dataId)
}
async function findById(id) {
    let dataId = {};
    dataId[primaryKeyField] = id;
    return await Common.findById(tableName, dataId, id);
}

module.exports = {
    insert,
    find,
    count,
    updateById,
    deleteById,
    findById,
    initDB,
    modelName: tableName,

};
