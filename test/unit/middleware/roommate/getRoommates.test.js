const expect = require("chai").expect;
const getRoommatesMW = require("../../../../middleware/roommate/getRoommates.mw");

describe('GetRoommates Middleware', function () {
    it('should call error handler when db query fails', function (done) {
        const expectedErr = "error";

        const mockObjRepo = {
            db: {
                Roommate: {
                    find: (query, cb) => {
                        expect(query).to.be.eql({});
                        setTimeout(() => cb(expectedErr), 0);
                    }
                }
            }
        };
        const mockReq = {};
        const mockRes = {locals: {}};
        const mockNext = (err) => {
            expect(err).to.be.eql(expectedErr);
            done();
        };

        const mw = getRoommatesMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });

    it('should assign roommates to res.locals.roommates and call next() without error', function (done) {
        const expectedRoommates = [{name: "Quentin Tarantula"}];

        const mockObjRepo =  {
            db: {
                Roommate: {
                    find: (query, cb) => {
                        expect(query).to.be.eql({});
                        setTimeout(() => cb(undefined, expectedRoommates), 0);
                    }
                }
            }
        };
        const mockReq = {};
        const mockRes = {locals: {}};
        const mockNext = (err) => {
            expect(err).to.be.undefined;
            expect(mockRes.locals.roommates).to.be.eql(expectedRoommates);
            done();
        };

        const mw = getRoommatesMW(mockObjRepo);
        mw(mockReq, mockRes, mockNext);
    });
});
