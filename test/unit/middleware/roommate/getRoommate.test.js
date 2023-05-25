const expect = require("chai").expect;
const getRoommateMW = require("../../../../middleware/roommate/getRoommate.mw");

describe('GetRoommate Middleware', function () {
    it('should call error handler when db query fails', function (done) {
        const expectedErr = "error";
        const expectedId = 0;

        const mockObjRepo = {
            db: {
                Roommate: {
                    findById: (id, cb) => {
                        expect(id).to.be.eql(expectedId);
                        setTimeout(() => cb(expectedErr), 0);
                    }
                }
            }
        };
        const mockReq = {params: {roommateId: expectedId}};
        const mockRes = {locals: {}};
        const mockNext = (err) => {
            expect(err).to.be.eql(expectedErr);
            done();
        };

        const mw = getRoommateMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });

    it('should assign roommate to res.locals.roommate and call next() without error', function (done) {
        const expectedRoommate = {name: "Quentin Tarantula"};
        const expectedId = 0;

        const mockObjRepo = {
            db: {
                Roommate: {
                    findById: (id, cb) => {
                        expect(id).to.be.eql(expectedId);
                        setTimeout(() => cb(undefined, expectedRoommate), 0);
                    }
                }
            }
        };
        const mockReq = {params: {roommateId: expectedId}};
        const mockRes = {locals: {}};
        const mockNext = (err) => {
            expect(err).to.be.undefined;
            expect(mockRes.locals.roommate).to.be.eql(expectedRoommate);
            done();
        };

        const mw = getRoommateMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });
});
