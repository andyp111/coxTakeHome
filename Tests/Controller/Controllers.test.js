const app = require('../../server/index.js');
const request = require('supertest');
const { jsxEmptyExpression } = require('@babel/types');

const testDatasetId = '272m4qpi2Qg';
const testVehicleId = '999512290';
const testDealerId = '73895196';
const testDealerName = "Bob's Cars"

describe("check if test works", () => {
    it('should return 2 for adding 1 + 1', () => {
        expect(1 + 1).toBe(2);
    })
})

describe("testing datasetId controller", () => {
    it("GET should return datasetId of type string", () => {
        return request(app)
            .get('/api/getId')
            .then((response) => {
                expect(response.status).toBe(200);
                expect(typeof response.body.datasetId).toBe('string')
                expect(response.body.datasetId.length > 1).toBe(true);
            })
    })
})

describe('testing vehicle id path', () => {
    it('GET should return 500 error when calling without an datasetId', () => {
        return request(app)
            .get('/api/vehicles/')
            .then((response) => {
                expect(response.status).toBe(500);
            })
    })
    it('GET should return 400 error when calling without valid datasetId', () => {
        return request(app)
            .get('/api/vehicles/1')
            .then((response) => {
                expect(response.status).toBe(400)
            })
    })
    it('GET should return data to an array', () => {
        return request(app)
            .get(`/api/vehicles/${testDatasetId}`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.vehicleIds.length > 1).toBe(true)
            })
    })
})

describe('testing vehicle information path', () => {
    it('GET should return 500 error when calling without vehicleId and datasetId', () => {
        return request(app)
            .get('/api/vehicles?')
            .then((response) => {
                expect(response.status).toBe(500)
            })
    })

    it('GET should return 400 when calling with incorrect ids', () => {
        return request(app)
            .get(`/api/vehicles?id=1&vehicleId=1`)
            .then((response) => {
                expect(response.status).toBe(400)
            })

    })
    it('GET should return 200 when calling with correct vehicleId and datasetId', () => {
        return request(app)
            .get(`/api/vehicles?id=${testDatasetId}&vehicleId=${testVehicleId}`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body !== null).toBe(true);
            })
    })
})

describe('testing dealer controller', () => {
    it('GET should return 400 error when calling with wrong ids', () => {
        return request(app)
            .get('/api/dealers?id=1&dealerId=2')
            .then((response) => {
                expect(response.status).toBe(400)
            })

    })
    it('GET should return 200 when calling with correct dealerId and datasetId', () => {
        return request(app)
            .get(`/api/dealers?id=${testDatasetId}&dealerId=${testDealerId}`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe(testDealerName);
            });

    })
})

describe('testing getAllData conroller', () => {
    it('GET should return 400 when calling with wrong id', () => {
        return request(app)
            .get('/api/getAll/1')
            .then((response) => {
                expect(response.status).toBe(400);
            })
    })
    //need to increase timeout value;
    jest.setTimeout(10000);
    it('GET should return 200 when calling with correctId with full data', () => {
        return request(app)
            .get(`/api/getAll/${testDatasetId}`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body !== null).toBe(true);
            })
    })
})

describe('test postingData controller', () => {
    it('POST sends false message with incorrect data', () => {
        return request(app)
            .post(`/api/postAnswer/${testDatasetId}`)
            .send({})
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(false);
            })
    })

    jest.setTimeout(10000)
    it('POST after retrieving all data should be successful', () => {
        return request(app)
            .get(`/api/getAll/${testDatasetId}`)
            .then((response) => {
                let data = response.body;
                return request(app)
                    .post(`/api/postAnswer/${testDatasetId}`)
                    .send(data)
                    .then((response) => {
                        expect(response.status).toBe(200);
                        expect(response.body.success).toBe(true);
                    })
            })
    })
})