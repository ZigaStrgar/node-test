exports.getStatus = (req, res, next) => {
    const clientIP = !req.headers.hasOwnProperty("x-forwarded-for")
    ? req.connection.remoteAddress
    : req.headers["x-forwarded-for"];

  Status.findOne({ ip: clientIP }, (err, client) => {
    if (!client) {
      axios
        .get(`${process.env.IP_API_URL}/${clientIP}`, {
          params: {
            access_key: process.env.IP_API_KEY
          }
        })
        .then(({ data }) => {
          const instance = new Status({
            ip: clientIP,
            location: {
              zip: data.zip,
              city: data.city,
              region: data.region_name,
              country: data.country_name,
              flag: data.location.country_flag,
              geo: {
                lat: data.latitude,
                lng: data.longitude
              }
            }
          });
          instance.save(err => {
            if (err) console.error(err);
          });
          res.render("status", { client: instance });
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      res.render("status", { client });
    }
  });
}