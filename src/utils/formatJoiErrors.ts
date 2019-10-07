interface Detail {
  message: string;
  path: string;
}

interface Errors {
  details: Detail[];
}

interface FormatedError {
  details: Detail[] | string;
}

const formatJoiErrors = (errors: Errors): FormatedError => {
  const { details } = errors;
  const detailsArray: Detail[] = [];

  if (details) {
    details.map((detail: Detail) => {
      const { message, path } = detail;

      return detailsArray.push({
        message: message.replace(/"/gi, ''),
        path: path[0],
      });
    });

    return { details: detailsArray };
  }

  return { details: errors.toString() };
};

export default formatJoiErrors;
