const requestTime = (request,response,next) => {
    console.log(`request recived at ${Date.now()}: ${request.method}`);
    next();
}
module.exports = {requestTime};