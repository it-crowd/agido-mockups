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

AgidoMockups.parseTable = function (text, withHeader)
{
    function parseColumnsSettings(line)
    {
        var columns = [];
        var tokens = line.split(",");
        for (var k = 0; k < tokens.length; k++) {
            var match = tokens[k].match(/\s*(\d+)?(L|R|C)?\s*/);
            if (match && (match[1] || match[2])) {
                var width = undefined == match[1] ? undefined : parseInt(match[1]);
                columns[k] = {width: width, align: match[2]};
            }
        }
        return columns;
    }

    function parseColumn(line, firstLine)
    {
        var column = {tokens: []};
        if (firstLine && withHeader !== false) {
            var matchArrowDown = line.match(/(.+\s+)v\s*$/);
            var matchArrowUp = line.match(/(.+\s+)\^\s*$/);
            var matchArrowUpDown = line.match(/(.+\s+)\^v\s*$/);
            if (matchArrowDown) {
                column.tokens.push({text: matchArrowDown[1]});
                column.tokens.push({icon: "arrowDown"});
                return column;
            } else if (matchArrowUp) {
                column.tokens.push({text: matchArrowUp[1]});
                column.tokens.push({icon: "arrowUp"});
                return column;
            } else if (matchArrowUpDown) {
                column.tokens.push({text: matchArrowUpDown[1]});
                column.tokens.push({icon: "arrowUpDown"});
                return column;
            }
        }
        if (0 < line.trim().length) {
            var matchCheckbox = line.match(/^\s*\[\s*(x)?\s*\]\s*$/);
            var matchRadio = line.match(/^\s*\(\s*(o)?\s*\)\s*$/);
            if (matchCheckbox) {
                column.tokens.push({checkbox: "x" == matchCheckbox[1]});
            } else if (matchRadio) {
                column.tokens.push({radio: "o" == matchRadio[1]});
            } else {
                column.tokens.push({text: line});
            }
        }
        return column;
    }

    function parseRow(line, firstLine)
    {
        var tokens = line.split(",");
        var row = {columns: []};
        /**
         * Split line into columns (beware of escaped coma)
         */
        var columnIndex = 0;
        for (var j = 0; j < tokens.length; j++) {
            if (j > 0 && tokens[j - 1].match(".*\\\\$")) {
                columnIndex--;
                row.columns[columnIndex] = row.columns[columnIndex].substring(0, row.columns[columnIndex].length - 1) + ",";
            }
            row.columns[columnIndex] = (undefined == row.columns[columnIndex] ? "" : row.columns[columnIndex]) + tokens[j];
            columnIndex++;
        }
        for (j = 0; j < row.columns.length; j++) {
            row.columns[j] = parseColumn(row.columns[j], firstLine);
        }
        return row;
    }

    var lines = text.split("\n");
    var table = {rows: [], columns: []};
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var match = line.match(/^\s*\{(.*)\}\s*$/);
        if (lines.length == i + 1 && match) {
            table.columns = parseColumnsSettings(match[1]);
            break;
        }
        table.rows.push(parseRow(line, 0 == i));
    }
    return table;
};
