(function ()
{
    function updateChildren(item, config)
    {
        var text = item.find(".text")[0];
        var border = item.find(".border")[0];
        var datepicker = item.find(".datepickerIcon")[0];
        var calendar = item.find(".calendarIcon")[0];
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
        var textOffset = 10;
        var textWidth = text.getWidth() + textOffset;
        var borderWidth = textWidth < 150 ? 150 : textWidth;
        var borderHeight = text.getHeight() + textOffset;
        //noinspection JSUnresolvedFunction
        border.setWidth(borderWidth);
        border.setHeight(borderHeight);
        //noinspection JSUnresolvedFunction
        border.setStroke(color);
        //noinspection JSUnresolvedFunction
        var datepickerOffset = 2;
        datepicker.setAttr("x", borderWidth + (2 * datepickerOffset));
        datepicker.setAttr("y", datepickerOffset);
        var datepickerScale = (borderHeight - 2 * datepickerOffset) / datepicker.getHeight();
        //noinspection JSUnresolvedFunction
        datepicker.setScale(datepickerScale);
        //noinspection JSUnresolvedFunction
        datepicker.setStroke(color);
        //noinspection JSUnresolvedFunction
        if (item.getInline()) {
            //noinspection JSUnresolvedFunction
            calendar.show();
            //noinspection JSUnresolvedFunction
            text.hide();
            //noinspection JSUnresolvedFunction
            border.hide();
            //noinspection JSUnresolvedFunction
            datepicker.hide();
        } else {
            //noinspection JSUnresolvedFunction
            calendar.hide();
            //noinspection JSUnresolvedFunction
            text.show();
            //noinspection JSUnresolvedFunction
            border.show();
            //noinspection JSUnresolvedFunction
            datepicker.show();
        }
    }

    Kinetic.Datepicker = function (config)
    {
        this.____init(config);
    };
    Kinetic.Datepicker.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Datepicker";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config, {name: "text", x: 5, y: 5, draggable: false, fill: config.color, stroke: null})));
            this.add(AgidoMockups.icons.datepicker.clone());
            this.add(AgidoMockups.icons.calendar.clone());
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
            this.on("inlineChange", propertyChangeListener);
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
    Kinetic.Util.extend(Kinetic.Datepicker, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'text', "29/07/2013");
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'inline', false);
})();
