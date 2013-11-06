(function ()
{
    function updateChildren(item)
    {
        var border = item.find(".border")[0];
        var arrowBorder = item.find(".arrowBorder")[0];
        var arrow = item.find(".arrowDown")[0];
        var expansion = item.find(".expansion")[0];
        var linesGroup = item.find(".linesGroup")[0];
        var lineOffset = 5;
        var doubleLineOffset = 2 * lineOffset;

        var color = item.getDisabled() ? '#aaa' : item.getColor();
        var component;
        var lineWidth;
        var lineHeight;
        var maxLineWidth = 0;
        var totalLinesHeight = lineOffset;
        linesGroup.destroyChildren();
        var lines = item.getText().split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (i == 0 || item.getOpened()) {
                component = new Kinetic.Text({text: lines[i], fill: color, fontSize: 18, x: lineOffset, y: i > 0 ? totalLinesHeight
                        + lineOffset : totalLinesHeight});
                component.setFontFamily(item.getFontFamily());
                component.setFontStyle(item.getFontStyle());
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
        var borderWidth = item.getWidth() - 4;
        border.setWidth(borderWidth - arrow.getWidth());
        border.setHeight(firstLineHeightWithOffset);
        border.setStroke(color);
        arrowBorder.setX(borderWidth - arrow.getWidth());
        arrowBorder.setHeight(firstLineHeightWithOffset);
        arrowBorder.setStroke(color);
        var arrowX = borderWidth - arrow.getWidth() + 13;
        var arrowY = firstLineHeightWithOffset / 2;
        arrow.setX(arrowX);
        arrow.setY(arrowY);
        arrow.setFill(color);
        if (item.getOpened()) {
            expansion.show();
            expansion.setY(firstLineHeightWithOffset);
            expansion.setWidth(item.getWidth());
            expansion.setHeight(totalLinesHeight - firstLineHeightWithOffset + lineOffset);
            expansion.setStroke(color);
            item.setHeight(totalLinesHeight + lineOffset);
        } else {
            expansion.hide();
            item.setHeight(totalLinesHeight);
        }
    }

    Kinetic.Select = function (config)
    {
        this.____init(config);
    };
    Kinetic.Select.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 150}, config));
            this.className = "Select";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowBorder", x: 125, y: 0, width: 25, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowDown.clone());
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "expansion", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Group(AgidoMockups.extend(config, {name: "linesGroup", x: 0, y: 0, draggable: false})));
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
            this.on("disabledChange", propertyChangeListener);
            this.on("openedChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Select, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'text', "Select");
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Select, 'opened', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.Select, 'color');
})();
