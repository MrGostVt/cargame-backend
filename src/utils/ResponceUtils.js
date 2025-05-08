export const HTTP_CODES = {
    OK_200: 200,
    CREATED_201: 201,
    NOCONTENT_204: 204,

    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
}

export const generateResponce = (message, payload = null) => {
    const ResponceTemplate = {
        message,
        payload,
    };

    return ResponceTemplate;
}   