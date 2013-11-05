(function ()
{
    function updateChildren(item)
    {
        var frame = item.find(".frame")[0];
        var headerBorder = item.find(".headerBorder")[0];
        var title = item.find(".title")[0];
        frame.setAttr("width", item.getWidth());
        frame.setAttr("height", item.getHeight());
        var frameStrokeWidth = frame.getStrokeWidth();
        title.setX(frameStrokeWidth);
        title.setY(0);
        title.setText(item.getText());
        headerBorder.setPoints([frameStrokeWidth, title.getHeight(), frame.getWidth() - frameStrokeWidth, title.getHeight()]);
    }

    Kinetic.Panel = function (config)
    {
        this.____init(config);
    };
    Kinetic.Panel.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 300, height: 200}, config));
            this.className = "Panel";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "frame", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 1})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "title", x: 0, y: 0, width: "auto", height: "auto", padding: 5, draggable: false, fill: '#000', stroke: null, fontFamily: 'Comic Sans MS'})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "headerBorder", x: 0, y: 0, draggable: false, stroke: '#000'})));
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
    Kinetic.Util.extend(Kinetic.Panel, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Panel, 'text', "Panel");
})();
