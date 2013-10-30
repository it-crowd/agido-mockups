(function ()
{
    function updateChildren(item, config)
    {
        var text = item.find(".text")[0];
        var border = item.find(".border")[0];
        var datepicker = item.find(".datepicker")[0];
        text.setText(item.getText());
        //noinspection JSUnresolvedFunction
        text.setFontFamily(item.getFontFamily());
        //noinspection JSUnresolvedFunction
        text.setFontStyle(item.getFontStyle());
        //noinspection JSUnresolvedFunction
        text.setFontSize(item.getFontSize());
        //noinspection JSUnresolvedFunction
        var color = item.getDisabled() ? '#aaa' : config.color;
        //noinspection JSUnresolvedFunction
        text.setFill(color);
        var textWidth = text.getWidth() + 10;
        var borderWidth = textWidth < 150 ? 150 : textWidth;
        var borderHeight = text.getHeight() + 10;
        //noinspection JSUnresolvedFunction
        border.setWidth(borderWidth);
        border.setHeight(borderHeight);
        //noinspection JSUnresolvedFunction
        border.setStroke(color);
        //noinspection JSUnresolvedFunction
        if (item.getDatepicker()) {
            //noinspection JSUnresolvedFunction
            datepicker.show();
            datepicker.setAttr("x", borderWidth + 4);
            datepicker.setAttr("y", 2);
            datepicker.setWidth(borderHeight - 4);
            datepicker.setHeight(borderHeight - 4);
        } else {
            datepicker.hide();
        }
    }

    Kinetic.Input = function (config)
    {
        this.____init(config);
    };
    Kinetic.Input.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Input";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config, {name: "text", x: 5, y: 5, draggable: false, fill: config.color, stroke: null})));
            var imageObj = new Image();
            imageObj.src = '../assets/datepicker.png';
            this.add(new Kinetic.Image(AgidoMockups.extend(config,
                    {name: "datepicker", x: 0, y: 0, image: imageObj, draggable: false, fill: 'white', stroke: null})));
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
            this.on("datepickerChange", propertyChangeListener);
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
    Kinetic.Util.extend(Kinetic.Input, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'text', "");
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'datepicker', false);
})();
