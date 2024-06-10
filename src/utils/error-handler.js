const LogErrorMessage = (error) => {
    let errorMessage;

    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        errorMessage = "Something Went Wrong";
    }
    return errorMessage;
};

module.exports = LogErrorMessage;
