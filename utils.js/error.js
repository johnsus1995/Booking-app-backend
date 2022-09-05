export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err; 
};

export const apiSuccessHandler = (status,message,data) => {
  const err = new Error()
  err.status = status;
  err.message = message;
  
  return {err,data}
}