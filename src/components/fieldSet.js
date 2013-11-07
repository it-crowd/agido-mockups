(function ()
{
    function updateChildren(item)
    {
        var background = item.find(".background")[0];
        var frame = item.find(".frame")[0];
        var title = item.find(".title")[0];
        var titleBackground = item.find(".titleBackground")[0];

        background.setWidth(item.getWidth());
        background.setHeight(item.getHeight());
        const frameMarginTop = 11;
        frame.setY(frameMarginTop);
        frame.setWidth(item.getWidth());
        frame.setHeight(item.getHeight() - frameMarginTop);
        const titleMarginLeft = 5;
        title.setX(titleMarginLeft);
        title.setText(item.getText());
        titleBackground.setX(titleMarginLeft);
        titleBackground.setWidth(title.getWidth());
        titleBackground.setHeight(title.getHeight());
    }

    Kinetic.FieldSet = function (config)
    {
        this.____init(config);
    };
    Kinetic.FieldSet.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 200, height: 200}, config));
            this.className = "FieldSet";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "background", x: 0, y: 0, draggable: false, fill: '#fff', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "frame", x: 0, y: 0, draggable: false, fill: null, stroke: '#000', strokeWidth: 2})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "titleBackground", x: 0, y: 0, draggable: false, fill: '#fff', stroke: null})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "title", x: 0, y: 0, width: "auto", height: "auto", padding: 5, draggable: false, fill: '#000', stroke: null, fontFamily: 'Comic Sans MS'})));
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
    Kinetic.Util.extend(Kinetic.FieldSet, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.FieldSet, 'text', "Field set name");
})();
