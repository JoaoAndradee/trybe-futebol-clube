type ErrorObject = {
  [key: string]: number,
};

const errorList: ErrorObject = {
  invalidToken: 401,
  invalidFormat: 400,
  badRequest: 400,
  invalidFields: 401,
  invalidDbFound: 404,
};

const mapError = (type: string): number => errorList[type] || 500;

export { errorList, mapError };
