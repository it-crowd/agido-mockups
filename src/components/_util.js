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

AgidoMockups.FORMATTED_TOKEN_TYPE_BOLD = "bold";
AgidoMockups.FORMATTED_TOKEN_TYPE_ITALIC = "italic";
AgidoMockups.FORMATTED_TOKEN_TYPE_LINK = "link";
AgidoMockups.FORMATTED_TOKEN_TYPE_STRIKETHROUGH = "strikethrough";
AgidoMockups.FORMATTED_TOKEN_TYPE_UNDERLINE = "underline";
AgidoMockups.tokenizeFormattedText = function (text)
{
    function getMinNonNegative()
    {
        var min = undefined;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] > -1 && (undefined == min || min > arguments[i])) {
                min = arguments[i];
            }
        }
        return min;
    }

    function stuff(tokens, position, endMark, type)
    {
        var end = line.indexOf(endMark, position + 1);
        if (end > -1) {
            var text = line.substring(position + 1, end);
            if (text.length > 0) {
                if (position > 0) {
                    tokens.push({text: line.substring(0, position) });
                }
                tokens.push({type: type, text: text});
                line = line.substring(end + 1);
                return 0;
            }
            return end + 1;
        }
        return position;
    }

    var tokenizedLines = [];
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var tokens = [];
        var position = 0;
        var line = lines[i];
        while (line.length > 0) {
            var linkStart = line.indexOf("[", position);
            var italicStart = line.indexOf("_", position);
            var boldStart = line.indexOf("*", position);
            var strikethroughStart = line.indexOf("~", position);
            var underlineStart = line.indexOf("&", position);
            position = getMinNonNegative(linkStart, italicStart, boldStart, strikethroughStart, underlineStart);
            //noinspection JSValidateTypes
            if (undefined != position) {
                if (position == linkStart) {
                    position = stuff(tokens, position, "]", AgidoMockups.FORMATTED_TOKEN_TYPE_LINK);
                } else if (position == italicStart) {
                    position = stuff(tokens, position, "_", AgidoMockups.FORMATTED_TOKEN_TYPE_ITALIC);
                } else if (position == boldStart) {
                    position = stuff(tokens, position, "*", AgidoMockups.FORMATTED_TOKEN_TYPE_BOLD);
                } else if (position == strikethroughStart) {
                    position = stuff(tokens, position, "~", AgidoMockups.FORMATTED_TOKEN_TYPE_STRIKETHROUGH);
                } else if (position == underlineStart) {
                    position = stuff(tokens, position, "&", AgidoMockups.FORMATTED_TOKEN_TYPE_UNDERLINE);
                }
            } else {
                if (line.length > 0) {
                    tokens.push({text: line.substring(position)});
                }
                break;
            }
            position++;
        }
        tokenizedLines.push(tokens);
    }
    return tokenizedLines;
};
