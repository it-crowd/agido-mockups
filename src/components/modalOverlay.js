(function ()
{
    function updateChildren(item)
    {
        var overlay = item.find(".overlay")[0];
        overlay.setWidth(item.getWidth());
        overlay.setHeight(item.getHeight());
    }

    Kinetic.ModalOverlay = function (config)
    {
        this.____init(config);
    };
    Kinetic.ModalOverlay.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 300, height: 300}, config));
            this.className = "ModalOverlay";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "overlay", x: 0, y: 0, draggable: false, fill: 'black', opacity: 0.5, stroke: null})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("widthChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.ModalOverlay, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.ModalOverlay, 'text', "");
})();
