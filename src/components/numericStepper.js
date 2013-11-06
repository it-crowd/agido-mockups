(function ()
{
    function updateChildren(item)
    {
        var border = item.find(".border")[0];
        var text = item.find(".text")[0];
        var arrowsBorder = item.find(".arrowsBorder")[0];
        var arrows = item.find(".arrowUpDown")[0];

        var color = item.getDisabled() ? '#aaa' : item.getColor();
        var arrowsOpacity = item.getDisabled() ? 0.4 : 1;
        text.setText(item.getText());
        text.setFontFamily(item.getFontFamily());
        text.setFontStyle(item.getFontStyle());
        text.setFontSize(item.getFontSize());
        text.setFill(color);
        const textOffset = 5;
        var strokeWidth = border.getStrokeWidth();
        var borderWidth = item.getWidth() - arrows.getWidth();
        var borderHeight = text.getHeight() + 2 * textOffset;
        border.setWidth(borderWidth);
        border.setHeight(borderHeight);
        border.setStroke(color);
        arrowsBorder.setX(borderWidth);
        arrowsBorder.setHeight(borderHeight);
        arrowsBorder.setStroke(color);
        var arrowX = borderWidth + 13;
        var arrowY = text.getHeight() / 2;
        arrows.setX(arrowX);
        arrows.setY(arrowY);
        arrows.setOpacity(arrowsOpacity);
        item.setHeight(border.getHeight());
        item.setClip(-1, -1, item.getWidth() + 3 * strokeWidth, item.getHeight() + 2 * strokeWidth);
    }

    Kinetic.NumericStepper = function (config)
    {
        this.____init(config);
    };
    Kinetic.NumericStepper.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 55}, config));
            this.className = "NumericStepper";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 5, y: 5, width: "auto", height: "auto", draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowsBorder", x: 30, y: 0, width: 25, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowUpDown.clone());
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
            this.on("widthChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.NumericStepper, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.NumericStepper, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.NumericStepper, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.NumericStepper, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.NumericStepper, 'text', "1");
    Kinetic.Factory.addGetterSetter(Kinetic.NumericStepper, 'disabled', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.NumericStepper, 'color');
})();
