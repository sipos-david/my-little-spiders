const expect = require("chai").expect;
const getEntryMW = require("../../../../middleware/entry/getEntry.mw");

describe('GetEntry Middleware', function () {
    it('should send status 400 when res.locals.roommate is missing', function (done) {
        const mockObjRepo = {};
        const mockReq = {};
        const mockRes = {
            locals: {},
            status: (code) => {
                expect(code).to.be.eql(400);
                return {
                    end: () => {
                        done();
                    }
                }
            }
        };
        const mockNext = () => {
            expect(1).to.be.eql(0);
        };

        const mw = getEntryMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });

    it('should call error handler when db query fails', function (done) {
        const expectedErr = "error";
        const expectedId = 0;

        const mockObjRepo = {
            db: {
                Entry: {
                    findById: (id, cb) => {
                        expect(id).to.be.eql(expectedId);
                        setTimeout(() => cb(expectedErr), 0);
                    }
                }
            }
        };
        const mockReq = {params: {entryId: expectedId}};
        const mockRes = {locals: {roommate: {}}};
        const mockNext = (err) => {
            expect(err).to.be.eql(expectedErr);
            done();
        };

        const mw = getEntryMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });

    it('should send status 400 and redirect when entry not found', function (done) {
        const expectedEntryId = 0;
        const expectedRoommateId = 1;
        const mockObjRepo = {
            db: {
                Entry: {
                    findById: (id, cb) => {
                        expect(id).to.be.eql(expectedEntryId);
                        setTimeout(() => cb(undefined, undefined), 0);
                    }
                }
            }
        };
        const mockReq = {params: {entryId: expectedEntryId}};
        const mockRes = {
            locals: {roommate: {id: expectedRoommateId}},
            status: (code) => {
                expect(code).to.be.eql(400);
                return {
                    redirect: (url) => {
                        expect(url).to.be.eql(`/roommate/${expectedRoommateId}`)
                        return {
                            end: () => {
                                done();
                            }
                        }
                    }
                }
            }
        };
        const mockNext = () => {
            expect(1).to.be.eql(0);
        };

        const mw = getEntryMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });

    it('should assign entry to res.locals.entry and call next() without error', function (done) {
        const expectedEntryId = 0;
        const expectedRoommateId = 1;
        const expectedEntry = {id: expectedEntryId};

        const mockObjRepo = {
            db: {
                Entry: {
                    findById: (id, cb) => {
                        expect(id).to.be.eql(expectedEntryId);
                        setTimeout(() => cb(undefined, expectedEntry), 0);
                    }
                }
            }
        };
        const mockReq = {params: {entryId: expectedEntryId}};
        const mockRes = {
            locals: {roommate: {id: expectedRoommateId}},
        };
        const mockNext = (err) => {
            expect(err).to.be.undefined;
            expect(mockRes.locals.entry).to.be.eql(expectedEntry)
            done();
        };

        const mw = getEntryMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });
});
