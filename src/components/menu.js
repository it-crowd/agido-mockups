(function ()
{
    function updateChildren(item)
    {
        var border = item.find(".border")[0];
        var itemsGroup = item.find(".itemsGroup")[0];
        var lineXOffsetLeft = 20;
        var lineXOffsetRight = 5;
        var lineYOffset = 5;
        var fontFamily = item.getFontFamily();
        var fontStyle = item.getFontStyle();
        var fontSize = item.getFontSize();

        var component;
        var rightAlignedComponents = [];
        var lineWidth;
        var maxLineWidth = 250;
        var totalLinesHeight = lineYOffset;
        itemsGroup.destroyChildren();
        var lines = item.getText().split("\n");
        for (var i = 0; i < lines.length; i++) {
            totalLinesHeight += lineYOffset;
            if (0 == lines[i].indexOf("-")) {
                component = new Kinetic.Line({
                    points: [lineXOffsetRight, totalLinesHeight, maxLineWidth - lineXOffsetRight, totalLinesHeight],
                    stroke: '#000',
                    strokeWidth: 2
                });
                Kinetic.Group.prototype.add.call(itemsGroup, component);
            } else {
                lineWidth = lineXOffsetLeft;
                var lineTokens = lines[i].split(",", 2);
                var color = '#000';
                if (0 == lineTokens[0].indexOf("/")) {
                    color = '#aaa';
                    lineTokens[0] = lineTokens[0].replace('/', '');
                }
                component = new Kinetic.Text({text: lineTokens[0], fill: color, fontFamily: fontFamily, fontStyle: fontStyle, fontSize: fontSize, x: lineWidth, y: totalLinesHeight});
                Kinetic.Group.prototype.add.call(itemsGroup, component);
                var components = [component];
                lineWidth += component.getWidth();
                if (lineTokens.length > 1) {
                    lineWidth += lineXOffsetLeft;
                    component = new Kinetic.Text({text: lineTokens[1], fill: color, fontFamily: fontFamily, fontStyle: fontStyle, fontSize: fontSize, x: lineWidth, y: totalLinesHeight});
                    Kinetic.Group.prototype.add.call(itemsGroup, component);
                    components.push(component);
                    rightAlignedComponents.push(component);
                    lineWidth += component.getWidth();
                }
                lineWidth += lineXOffsetRight;
                if (lineWidth > maxLineWidth) {
                    maxLineWidth = lineWidth;
                }
            }
            totalLinesHeight += component.getHeight() + lineYOffset;
        }
        var borderHeight = totalLinesHeight < 150 ? 150 : totalLinesHeight;
        for (i = 0; i < rightAlignedComponents.length; i++) {
            component = rightAlignedComponents[i];
            component.setX(maxLineWidth - component.getWidth() - lineXOffsetRight);
        }
        border.setWidth(maxLineWidth);
        border.setHeight(borderHeight + lineYOffset);
        item.setHeight(border.getHeight());
        item.setWidth(border.getWidth());
    }

    Kinetic.Menu = function (config)
    {
        this.____init(config);
    };
    Kinetic.Menu.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Menu";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Group(AgidoMockups.extend(config, {name: "itemsGroup", x: 0, y: 0, draggable: false})));
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
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Menu, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Menu, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Menu, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Menu, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Menu, 'text', "Open,CTRL+O\nOpen Recent,>\n-\nActive Item\n/Disabled Item\n-\nExit,CTRL+Q");
})();