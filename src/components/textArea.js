(function ()
{
    function updateChildren(item, config)
    {
        var border = item.find(".border")[0];
        var linesGroup = item.find(".linesGroup")[0];
        var lineOffset = 5;

        //noinspection JSUnresolvedFunction
        var color = item.getDisabled() ? '#aaa' : config.color;
        var component;
        var lineWidth;
        var maxLineWidth = 0;
        var totalLinesHeight = lineOffset;
        linesGroup.removeChildren();
        var lines = item.getText().split("\n");
        for (var i = 0; i < lines.length; i++) {
            totalLinesHeight += lineOffset;
            component = new Kinetic.Text({text: lines[i], fill: color, fontSize: 18, x: lineOffset, y: totalLinesHeight});
            //noinspection JSUnresolvedFunction
            component.setFontFamily(item.getFontFamily());
            //noinspection JSUnresolvedFunction
            component.setFontStyle(item.getFontStyle());
            //noinspection JSUnresolvedFunction
            component.setFontSize(item.getFontSize());
            Kinetic.Group.prototype.add.call(linesGroup, component);
            lineWidth = component.getWidth();
            totalLinesHeight += component.getHeight() + lineOffset;
            if (lineWidth > maxLineWidth) {
                maxLineWidth = lineWidth;
            }
        }
        var borderWidth = maxLineWidth < 250 ? 250 : maxLineWidth;
        var borderHeight = totalLinesHeight < 150 ? 150 : totalLinesHeight;
        //noinspection JSUnresolvedFunction
        border.setWidth(borderWidth + 2 * lineOffset);
        border.setHeight(borderHeight + lineOffset);
        //noinspection JSUnresolvedFunction
        border.setStroke(color);
    }

    Kinetic.TextArea = function (config)
    {
        this.____init(config);
    };
    Kinetic.TextArea.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "TextArea";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
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
    Kinetic.Util.extend(Kinetic.TextArea, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'text', "");
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'disabled', false);
})();
