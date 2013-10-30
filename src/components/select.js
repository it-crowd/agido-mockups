(function ()
{
    function updateChildren(item, config)
    {
        var border = item.find(".border")[0];
        var arrowBorder = item.find(".arrowBorder")[0];
        var arrow = item.find(".arrowDown")[0];
        var expansion = item.find(".expansion")[0];
        var linesGroup = item.find(".linesGroup")[0];
        var lineOffset = 5;
        var doubleLineOffset = 2 * lineOffset;

        //noinspection JSUnresolvedFunction
        var color = item.getDisabled() ? '#aaa' : config.color;
        var component;
        var lineWidth;
        var lineHeight;
        var maxLineWidth = 0;
        var totalLinesHeight = lineOffset;
        linesGroup.removeChildren();
        var lines = item.getText().split("\n");
        for (var i = 0; i < lines.length; i++) {
            //noinspection JSUnresolvedFunction
            if (i == 0 || item.getOpened()) {
                component = new Kinetic.Text({text: lines[i], fill: color, fontSize: 18, x: lineOffset, y: i > 0 ? totalLinesHeight
                        + lineOffset : totalLinesHeight});
                //noinspection JSUnresolvedFunction
                component.setFontFamily(item.getFontFamily());
                //noinspection JSUnresolvedFunction
                component.setFontStyle(item.getFontStyle());
                //noinspection JSUnresolvedFunction
                component.setFontSize(item.getFontSize());
                Kinetic.Group.prototype.add.call(linesGroup, component);
                lineWidth = component.getWidth();
                lineHeight = component.getHeight();
                totalLinesHeight += lineHeight + lineOffset;
                if (lineWidth > maxLineWidth) {
                    maxLineWidth = lineWidth;
                }
            }
        }

        var firstLineHeightWithOffset = lineHeight + doubleLineOffset;
        //noinspection JSUnresolvedFunction
        var borderWidth = maxLineWidth + doubleLineOffset < 125 ? 125 : maxLineWidth + doubleLineOffset;
        border.setWidth(borderWidth);
        border.setHeight(firstLineHeightWithOffset);
        //noinspection JSUnresolvedFunction
        border.setStroke(color);
        arrowBorder.setAttr("x", borderWidth);
        arrowBorder.setHeight(firstLineHeightWithOffset);
        //noinspection JSUnresolvedFunction
        arrowBorder.setStroke(color);
        var arrowX = borderWidth + 13;
        var arrowY = firstLineHeightWithOffset / 2;
        arrow.setAttr("x", arrowX);
        arrow.setAttr("y", arrowY);
        //noinspection JSUnresolvedFunction
        arrow.setFill(color);
        //noinspection JSUnresolvedFunction
        if (item.getOpened()) {
            //noinspection JSUnresolvedFunction
            expansion.show();
            expansion.setAttr("y", firstLineHeightWithOffset);
            expansion.setWidth(borderWidth + arrowBorder.getWidth());
            expansion.setHeight(totalLinesHeight - firstLineHeightWithOffset + lineOffset);
            //noinspection JSUnresolvedFunction
            expansion.setStroke(color);
        } else {
            expansion.hide();
        }
    }

    Kinetic.Select = function (config)
    {
        this.____init(config);
    };
    Kinetic.Select.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Select";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, width: 125, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowBorder", x: 125, y: 0, width: 25, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowDown.clone());
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "expansion", x: 0, y: 0, width: 125, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Group(AgidoMockups.extend(config, {name: "linesGroup", draggable: false})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this, config);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("fontStyleChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            this.on("disabledChange", propertyChangeListener);
            this.on("openedChange", propertyChangeListener);
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }, getHeight: function ()
        {
            return this.find(".border")[0].getHeight();
        }
    };
    Kinetic.Util.extend(Kinetic.Select, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'text', "Select");
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'opened', false);
})();
