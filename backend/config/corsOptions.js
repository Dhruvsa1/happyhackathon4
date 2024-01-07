const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
  },
  credentials: true,
 methods: ["GET", "POST", "PATCH", "DELETE"],
};

// const corsOptions = {
//   origin: "https://lambertrecstem.org",
//   // Replace with the client's origin
//   credentials: true,
//   methods: ["GET", "POST", "PATCH", "DELETE"], // And any other methods your API uses
// };

module.exports = corsOptions;
