export const handleError = (
  error,
  res,
  status = 500,
  message = "Internal server error."
) => {
  console.log("🚀 ~ error:", error);
  return res.status(status).json({ message });
};
