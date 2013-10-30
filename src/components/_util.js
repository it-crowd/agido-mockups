window.AgidoMockups = window.AgidoMockups || {};
AgidoMockups.extend = function ()
{
    var result = {};
    for (var argIndex in arguments) {
        if (arguments.hasOwnProperty(argIndex)) {
            for (var key in arguments[argIndex]) {
                if (arguments[argIndex].hasOwnProperty(key)) {
                    result[key] = arguments[argIndex][key];
                }
            }
        }
    }
    return result;
};
