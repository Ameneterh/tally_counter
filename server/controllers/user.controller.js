export const test = (req, res) => {
  res.json({ message: "API from Routes Working!" });
};

export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("You have been signed out!");
  } catch (error) {
    next(error);
  }
};
