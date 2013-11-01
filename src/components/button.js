(function ()
{
    function updateChildren(item)
    {
        var text = item.find(".text")[0];
        var border = item.find(".border")[0];
        var shadow = item.find(".shadow")[0];
        text.setText(item.getText());
        text.setFontFamily(item.getFontFamily());
        text.setFontStyle(item.getFontStyle());
        text.setFontSize(item.getFontSize());
        var color = item.getDisabled() ? '#aaa' : item.getColor();
        var textWidth = text.getWidth();
        border.setWidth(item.getWidth());
        border.setHeight(item.getHeight());
        border.setStroke(color);
        var borderWidth = border.getWidth();
        text.setX((borderWidth - textWidth) / 2);
        text.setY((border.getHeight() - text.getHeight()) / 2);
        text.setFill(color);
        shadow.setWidth(borderWidth);
        shadow.setHeight(border.getHeight());
        shadow.setFill(color);
    }

    Kinetic.Button = function (config)
    {
        this.____init(config);
    };
    Kinetic.Button.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Button";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "shadow", x: 5, y: 5, draggable: false, fill: 'black', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 0, y: 5, width: "auto", height: "auto", draggable: false, fill: config.color, stroke: null})));
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
            this.on("heightChange", propertyChangeListener);
            if (!this.getWidth() || !this.getHeight()) {
                this.autosize();
            } else {
                updateChildren(this);
            }
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Button, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'text', "Button");
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'disabled', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.Button, 'color');
    Kinetic.Util.addMethods(Kinetic.Button, {
        autosize: function ()
        {
            var text = this.find(".text")[0];
            text.setText(this.getText());
            text.setFontFamily(this.getFontFamily());
            text.setFontStyle(this.getFontStyle());
            text.setFontSize(this.getFontSize());
            this.attrs.width = text.getWidth() + 40;
            this.attrs.height = text.getHeight() + 10;
            updateChildren(this);
        }
    });
})();
