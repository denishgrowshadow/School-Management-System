module.exports = {

    OK: 200,
    CREATE: 201,
    ACCEPTED: 202,
    No_Content: 204,
    Bad_Request: 400,
    Unauthorized: 401,
    Forbidden: 403,
    Not_Found: 404,
    Method_Not_Allowed: 405,
    Conflict: 409,
    Internal_Server: 500,
    Not_Implemented: 501,
    Bad_Gateway: 502,
    Unavailable: 503,
    Timeout: 504,

    "200": {
        "message": "OK",
        "description": "The request has succeeded."
    },
    "201": {
        "message": "Created",
        "description": "The request has been fulfilled and has resulted in a new resource being created."
    },
    "202": {
        "message": "Accepted",
        "description": "The request has been accepted for processing, but the processing has not been completed."
    },
    "204": {
        "message": "No Content",
        "description": "The server successfully processed the request and is not returning any content."
    },
    "400": {
        "message": "Bad Request",
        "description": "The server could not understand the request due to invalid syntax."
    },
    "401": {
        "message": "Unauthorized",
        "description": "The client must authenticate itself to get the requested response."
    },
    "403": {
        "message": "Forbidden",
        "description": "The client does not have access rights to the content."
    },
    "404": {
        "message": "Not Found",
        "description": "The server can not find the requested resource."
    },
    "405": {
        "message": "Method Not Allowed",
        "description": "The request method is known by the server but is not supported by the target resource."
    },
    "409": {
        "message": "Conflict",
        "description": "The request could not be completed due to a conflict with the current state of the resource."
    },
    "422": {
        "message": "Unprocessable Entity",
        "description": "The server understands the content type and syntax of the request, but was unable to process the contained instructions."
    },
    "429": {
        "message": "Too Many Requests",
        "description": "The user has sent too many requests in a given amount of time (rate limiting)."
    },
    "500": {
        "message": "Internal Server Error",
        "description": "The server has encountered a situation it doesn't know how to handle."
    },
    "501": {
        "message": "Not Implemented",
        "description": "The request method is not supported by the server and cannot be handled."
    },
    "502": {
        "message": "Bad Gateway",
        "description": "The server, while acting as a gateway or proxy, received an invalid response from the upstream server."
    },
    "503": {
        "message": "Service Unavailable",
        "description": "The server is not ready to handle the request. Common causes are a server that is down for maintenance or overloaded."
    },
    "504": {
        "message": "Gateway Timeout",
        "description": "The server is acting as a gateway or proxy and did not receive a timely response from the upstream server."
    }
}
