(function ()
{
    function updateChildren(item)
    {
        var picker = item.find(".picker")[0];
        var arrow = item.find(".arrowDown")[0];

        var color = item.getDisabled() ? '#aaa' : '#000';
        picker.setWidth(item.getWidth());
        picker.setHeight(item.getHeight());
        picker.setStroke(color);
        arrow.setX(picker.getWidth() - arrow.getWidth() / 4);
        arrow.setY(picker.getHeight() - arrow.getHeight() / 3);
        arrow.setFill(color);
    }

    Kinetic.ColorPicker = function (config)
    {
        this.____init(config);
    };
    Kinetic.ColorPicker.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 25, height: 25}, config));
            this.className = "ColorPicker";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "picker", x: 0, y: 0, draggable: false, fill: config.color, stroke: '#000', strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowDown.clone());
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("disabledChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.ColorPicker, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.ColorPicker, 'text', "");
    Kinetic.Factory.addGetterSetter(Kinetic.ColorPicker, 'disabled', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.ColorPicker, 'color');
})();
