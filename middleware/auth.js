const { User } = require("../models/users");
const { Order } = require("../models/orders");
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

// middleware function to check for logged-in users
const sessionChecker = (hbsFile) => {

  return async function(req, res, next) {
		if (req.session.user) {
			res.render(hbsFile, { isAuth: true, orders: await Order.getAllOrders() } );
		} else {
			next();
		}
	};
};

module.exports = {
  sessionChecker,
  cookiesCleaner
};
