(function ()
{
    function updateChildren(item)
    {
        var background = item.find(".background")[0];
        var scrollBorder = item.find(".scrollBorder")[0];
        var scroll = item.find(".scroll")[0];
        var arrowLeftBorder = item.find(".arrowLeftBorder")[0];
        var arrowLeft = item.find(".arrowLeft")[0];
        var arrowRight = item.find(".arrowRight")[0];
        var arrowRightBorder = item.find(".arrowRightBorder")[0];

        const componentHeight = 15;
        background.setWidth(item.getWidth());
        background.setHeight(componentHeight);
        const strokeWidth = scrollBorder.getStrokeWidth();
        arrowLeftBorder.setWidth(componentHeight);
        arrowLeftBorder.setHeight(componentHeight);
        var arrowMargin = 4.5;
        arrowLeft.setX(arrowMargin);
        arrowLeft.setY(arrowMargin);
        arrowLeft.setScale(componentHeight / 2 / arrowLeft.getHeight());
        const arrowBorderWidth = arrowLeftBorder.getWidth();
        scrollBorder.setX(arrowBorderWidth);
        scrollBorder.setWidth(background.getWidth() - 2 * arrowBorderWidth);
        scrollBorder.setHeight(componentHeight);
        const scrollMargin = strokeWidth + 2;
        const scrollWidth = 30;
        scroll.setX(arrowBorderWidth + scrollMargin);
        scroll.setY(scrollMargin);
        scroll.setWidth(scrollWidth);
        scroll.setHeight(componentHeight - 2 * scrollMargin);
        arrowRightBorder.setWidth(arrowBorderWidth);
        arrowRightBorder.setHeight(componentHeight);
        arrowRightBorder.setX(background.getWidth() - arrowBorderWidth);
        arrowRight.setX(arrowRightBorder.getX() + 2 * arrowMargin);
        arrowRight.setY(arrowLeft.getY());
        arrowRight.setScale(componentHeight / 2 / arrowRight.getHeight());
        item.setClip(0, 0, item.getWidth(), componentHeight);
    }

    Kinetic.HorizontalScrollBar = function (config)
    {
        this.____init(config);
    };
    Kinetic.HorizontalScrollBar.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({height: 15, width: 200}, config));
            this.className = "HorizontalScrollBar";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "background", x: 0, y: 0, draggable: false, fill: '#fff', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowLeftBorder", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowLeft.clone());
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "scrollBorder", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 2})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "scroll", x: 0, y: 0, draggable: false, fill: '#000', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowRightBorder", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowRight.clone());
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.HorizontalScrollBar, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.HorizontalScrollBar, 'text', "");
})();
