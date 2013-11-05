(function ()
{
    function updateChildren(item)
    {
        var text = item.find(".text")[0];
        var background = item.find(".background")[0];
        var textContent = item.getText();
        background.setWidth(item.getWidth());
        background.setHeight(item.getHeight());
        text.setText(textContent);
        var textY = (background.getHeight() - text.getHeight()) / 2;
        text.setY(textY);
        text.setWidth(background.getWidth());
        item.setClip([0, 0, item.getWidth(), item.getHeight()]);
    }

    Kinetic.ImageItem = function (config)
    {
        this.____init(config);
    };
    Kinetic.ImageItem.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 80, height: 80}, config));
            this.className = "ImageItem";
            this.add(new Kinetic.Shape({name: "background", fill: '#fff', stroke: '#000', strokeWidth: 2,
                drawFunc: function (context)
                {
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.lineTo(this.getWidth(), 0);
                    context.lineTo(this.getWidth(), this.getHeight());
                    context.lineTo(0, this.getHeight());
                    context.lineTo(0, 0);
                    context.lineTo(this.getWidth(), this.getHeight());
                    context.moveTo(this.getWidth(), 0);
                    context.lineTo(0, this.getHeight());
                    context.closePath();
                    context.fillStrokeShape(this);
                }
            }));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 0, y: 0, width: "auto", height: "auto", align: 'center', draggable: false, fill: '#000', fontSize: 14, stroke: null})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("textChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.ImageItem, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.ImageItem, 'text', "");
})();
