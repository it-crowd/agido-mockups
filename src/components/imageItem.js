(function ()
{
    function updateChildren(item)
    {
        var text = item.find(".text")[0];
        var background = item.find(".background")[0];
        var image = item.find(".image")[0];
        var textContent = item.getText();
        text.setText(textContent);
        var backgroundWidth = background.getWidth();
        var backgroundHeight = background.getHeight();
        var textY = (backgroundHeight - text.getHeight()) / 2;
        text.setAttr('y', textY);
        text.setWidth(backgroundWidth);
        image.setWidth(backgroundWidth);
        image.setHeight(backgroundHeight);
        if (null != textContent.match(/\.(jpeg|jpg|gif|png)$/)) {
            var imageObj = new Image();
//            imageObj.crossOrigin = "Anonymous";
            imageObj.src = textContent;
            image.getData()
            //noinspection JSUnresolvedFunction
            image.setImage(imageObj);
            image.show();
        } else {
            image.hide();
        }
        //noinspection JSUnresolvedFunction
        item.setClip([0, 0, 80, 80]);
    }

    Kinetic.ImageItem = function (config)
    {
        this.____init(config);
    };
    Kinetic.ImageItem.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "ImageItem";
            this.add(new Kinetic.Shape({name: "background", width: 80, height: 80, stroke: '#000', strokeWidth: 2,
                drawFunc: function (context)
                {
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.lineTo(80, 0);
                    context.lineTo(80, 80);
                    context.lineTo(0, 80);
                    context.lineTo(0, 0);
                    context.lineTo(80, 80);
                    context.moveTo(80, 0);
                    context.lineTo(0, 80);
                    context.closePath();
                    context.fillStrokeShape(this);
                }
            }));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 0, y: 0, align: 'center', draggable: false, fill: '#000', fontSize: 14, stroke: null})));
            this.add(new Kinetic.Image({name: 'image', x: 0, y: 0, image: null, width: 0, height: 0}));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("textChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }, getHeight: function ()
        {
            return this.find(".background")[0].getHeight();
        }
    };
    Kinetic.Util.extend(Kinetic.ImageItem, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.ImageItem, 'text', "");
})();
