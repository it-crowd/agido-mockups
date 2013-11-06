(function ()
{
    function updateChildren(item)
    {
        item.destroyChildren();
        var config = {
            fontFamily: item.getFontFamily(),
            fontStyle: item.getFontStyle(),
            fontSize: item.getFontSize(),
            padding: item.getPadding(),
            fill: '#000'
        };

        var columns = [];

        function getColumn(index)
        {
            var cachedEntry = columns[index];
            if (undefined == cachedEntry) {
                cachedEntry = columns[index] = new Kinetic.Group({name: "Column"});
                item.add(cachedEntry);
                return  cachedEntry;
            } else {
                return cachedEntry;
            }
        }

        var table = AgidoMockups.parseTable(item.getText(), item.getShowHeader());
        /**
         * Convert tokens into Kinetic shapes and calculate max row and column heights
         */
        var rowIndex, row, columnIndex, column, tokenIndex, columnSettings, totalHeight = 0;
        for (rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
            var rowHeight = 0;
            row = table.rows[rowIndex];
            row.y = 0 == rowIndex ? 0 : table.rows[rowIndex - 1].y + table.rows[rowIndex - 1].height;
            for (columnIndex = 0; columnIndex < row.columns.length; columnIndex++) {
                column = row.columns[columnIndex];
                var columnMaxWidth = 0;
                for (tokenIndex = 0; tokenIndex < column.tokens.length; tokenIndex++) {
                    var token = column.tokens[tokenIndex];
                    var isIcon = false;
                    if (undefined != token.checkbox) {
                        column.tokens[tokenIndex] = new Kinetic.Checkbox(AgidoMockups.extend(config,
                                {selected: token.checkbox, x: 0, y: 0, color: '#000', text: ""}));
                    } else if (undefined != token.radio) {
                        column.tokens[tokenIndex] = new Kinetic.RadioItem(AgidoMockups.extend(config, {selected: token.radio, color: '#000', text: ""}));
                    } else if (undefined != token.icon) {
                        isIcon = true;
                        var icon = AgidoMockups.icons[token.icon];
                        if (undefined == icon) {
                            console.warn("Missing icon: " + token.icon);
                            column.tokens.splice(tokenIndex, 1);
                            continue;
                        } else {
                            column.tokens[tokenIndex] = icon.clone();
                        }
                    } else {
                        var text = token.text;
                        text = undefined == text ? undefined : text.replace("\\r", "\n");
                        column.tokens[tokenIndex] = new Kinetic.Text(AgidoMockups.extend(config, {text: text}));
                    }
                    var component = column.tokens[tokenIndex];
                    getColumn(columnIndex).add(component);
                    if (isIcon) {
                        component.setY(row.y + item.getPadding());
                    } else {
                        component.setY(row.y);
                    }
                    if (tokenIndex > 0) {
                        component.setX(columnMaxWidth);
                    }
                    columnMaxWidth += component.getWidth();
                    rowHeight = Math.max(rowHeight, component.getHeight());
                }
                table.columns[columnIndex] = table.columns[columnIndex] || {};
                table.columns[columnIndex].maxWidth = table.columns[columnIndex].maxWidth || 0;
                table.columns[columnIndex].maxWidth = Math.max(table.columns[columnIndex].maxWidth, columnMaxWidth);
            }
            row.height = rowHeight;
            totalHeight += rowHeight;
        }
        /**
         * Calculate column widths
         */
        var fixedWidth = 0, columnComponent;
        for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            columnSettings = table.columns[columnIndex];
            columnComponent = getColumn(columnIndex);
            if (undefined == columnSettings || undefined == columnSettings.width || 0 >= columnSettings.width) {
                columnComponent.setWidth(Math.max(1, columnSettings.maxWidth));
                fixedWidth += columnComponent.getWidth();
            }
        }
        for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            columnSettings = table.columns[columnIndex];
            columnComponent = getColumn(columnIndex);
            if (!(undefined == columnSettings || undefined == columnSettings.width || 0 >= columnSettings.width)) {
                var percentage = columnSettings.width / 100;
                columnComponent.setWidth(Math.max(1, (item.getWidth() - fixedWidth) * percentage));
            }
        }
        var left = 0, totalWidth = 0;
        for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            column = getColumn(columnIndex);
            column.setX(left);
            left += column.getWidth();
            totalWidth += column.getWidth();
            column.setClip(0, 0, column.getWidth(), totalHeight);
        }
        /**
         * Add row background
         */
        for (rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
            row = table.rows[rowIndex];
            var rowColor = rowIndex % 2 == 0 ? '#fafafa' : '#eee';
            if (0 == rowIndex && item.getShowHeader()) {
                rowColor = '#aaa';
            }
            var rowBackground = new Kinetic.Rect({
                x: 0,
                y: row.y,
                width: totalWidth,
                height: row.height,
                fill: rowColor,
                stroke: 'black',
                strokeWidth: .5
            });
            item.add(rowBackground);
            rowBackground.moveToBottom();
        }
        item.setHeight(row.y + row.height);
    }

    Kinetic.Table = function (config)
    {
        this.____init(config);
    };
    Kinetic.Table.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Table";
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("fontStyleChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("paddingChange", propertyChangeListener);
            this.on("showHeaderChange", propertyChangeListener);
            updateChildren(this);
        }, toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Table, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'fontSize', 12);
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'showHeader', true);
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'height', 200);
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'width', 300);
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'padding', 10);
    Kinetic.Factory.addGetterSetter(Kinetic.Table, 'text',
            "First\\r(last name) ^, Age ^v, Ksywa, Selector v\n" + "Jack\\rOf all trades, 27, jm, (o)\nTomo\\rKrotovina, 36, , [x]\n"
                    + "Bear\\rThe bald, 32, BB, []\nKazmierz\\rWielki, ?, KW, [x]\n" + "Kristof Soccerer, 23, Magic Bit, (o)\n{65L, 0R, 35, 0C}");
})();
