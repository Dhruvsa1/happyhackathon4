const handleLogout = (req, res) => {
  res.clearCookie("jwt");
  res.send("Logged out");
};

module.exports = {
  handleLogout,
};
