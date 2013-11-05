(function ()
{
    function updateChildren(item)
    {
        var text = item.find(".text")[0];
        var border = item.find(".border")[0];
        var datepicker = item.find(".datepickerIcon")[0];
        var calendar = item.find(".calendarIcon")[0];
        text.setText(item.getText());
        text.setFontFamily(item.getFontFamily());
        text.setFontStyle(item.getFontStyle());
        text.setFontSize(item.getFontSize());
        var color = item.getDisabled() ? '#aaa' : item.getColor();
        text.setFill(color);
        var textOffset = 10;
        var borderHeight = text.getHeight() + textOffset;
        border.setWidth(item.getWidth() - datepicker.getWidth());
        border.setHeight(borderHeight);
        border.setStroke(color);
        var datepickerOffset = 2;
        datepicker.setX(item.getWidth() - datepicker.getWidth() + (2 * datepickerOffset));
        datepicker.setY(datepickerOffset);
        var datepickerScale = (borderHeight - 2 * datepickerOffset) / datepicker.getHeight();
        datepicker.setScale(datepickerScale);
        datepicker.setStroke(color);
        if (item.getInline()) {
            calendar.show();
            text.hide();
            border.hide();
            datepicker.hide();
            item.setHeight(calendar.getHeight());
        } else {
            calendar.hide();
            text.show();
            border.show();
            datepicker.show();
            item.setHeight(border.getHeight());
        }
    }

    Kinetic.Datepicker = function (config)
    {
        this.____init(config);
    };
    Kinetic.Datepicker.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 150}, config));
            this.className = "Datepicker";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 5, y: 5, width: "auto", height: "auto", draggable: false, fill: config.color, stroke: null})));
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
            this.on("colorChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Datepicker, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'text', "29/07/2013");
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Datepicker, 'inline', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.Datepicker, 'color');
})();
