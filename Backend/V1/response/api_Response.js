exports.success = (data, message = "Success", code = 200) => {
    return { success: true, code, message, data };
};

exports.error = (error, code = 500) => {
    return { success: false, message: error, code };
};
