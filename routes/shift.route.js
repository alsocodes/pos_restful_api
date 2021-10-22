const shift = require("../controllers/shift");


module.exports = (app) => {
    app.post("/shift", shift.create);
    app.get("/shift/current/:outlet_id", shift.currentShift);
};
