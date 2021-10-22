const { AccessControl } = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("customer").updateOwn("customer").readOwn("customer");
  ac.grant("admin")
    .readAny("dashboard")
    .createAny("customer")
    .deleteAny("customer")
    .readAny("customer")
    .updateAny("customer")
    .createAny("installment")
    .deleteAny("installment")
    .readAny("installment")
    .updateAny("installment")
    .createAny("loan")
    .deleteAny("loan")
    .readAny("loan")
    .updateAny("loan");
  ac.grant("manager")
    .extend("admin")
    .createAny("role")
    .deleteAny("role")
    .readAny("role")
    .updateAny("role")
    .createAny("user")
    .deleteAny("user")
    .readAny("user")
    .updateAny("user");
  return ac;
})();
