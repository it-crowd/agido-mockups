(function ()
{
    function updateChildren(item)
    {
        var background = item.find(".background")[0];
        var scrollBorder = item.find(".scrollBorder")[0];
        var scroll = item.find(".scroll")[0];
        var arrowUpBorder = item.find(".arrowUpBorder")[0];
        var arrowUp = item.find(".arrowUp")[0];
        var arrowDown = item.find(".arrowDown")[0];
        var arrowDownBorder = item.find(".arrowDownBorder")[0];

        const componentWidth = 15;
        background.setWidth(componentWidth);
        background.setHeight(item.getHeight());
        const strokeWidth = scrollBorder.getStrokeWidth();
        arrowUpBorder.setWidth(componentWidth);
        arrowUpBorder.setHeight(componentWidth);
        arrowUp.setX(arrowUpBorder.getWidth() / 2);
        arrowUp.setY(arrowUpBorder.getHeight() / 2);
        arrowUp.setScale(componentWidth / 2 / arrowUp.getWidth());
        const arrowBorderHeight = arrowUpBorder.getHeight();
        scrollBorder.setY(arrowBorderHeight);
        scrollBorder.setWidth(componentWidth);
        scrollBorder.setHeight(background.getHeight() - 2 * arrowBorderHeight);
        const scrollMargin = strokeWidth + 2;
        const scrollHeight = 30;
        scroll.setX(scrollMargin);
        scroll.setY(arrowBorderHeight + scrollMargin);
        scroll.setWidth(componentWidth - 2 * scrollMargin);
        scroll.setHeight(scrollHeight);
        arrowDownBorder.setWidth(componentWidth);
        arrowDownBorder.setHeight(arrowBorderHeight);
        arrowDownBorder.setY(background.getHeight() - arrowBorderHeight);
        arrowDown.setX(arrowUp.getX());
        arrowDown.setY(arrowDownBorder.getY() + (arrowDownBorder.getHeight() / 2));
        arrowDown.setScale(componentWidth / 2 / arrowDown.getWidth());
        item.setClip(0, 0, componentWidth, item.getHeight());
    }

    Kinetic.VerticalScrollBar = function (config)
    {
        this.____init(config);
    };
    Kinetic.VerticalScrollBar.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({height: 200, width: 15}, config));
            this.className = "VerticalScrollBar";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "background", x: 0, y: 0, draggable: false, fill: '#fff', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowUpBorder", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowUp.clone());
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "scrollBorder", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 2})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "scroll", x: 0, y: 0, draggable: false, fill: '#000', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "arrowDownBorder", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 2})));
            this.add(AgidoMockups.icons.arrowDown.clone());
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
    Kinetic.Util.extend(Kinetic.VerticalScrollBar, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.VerticalScrollBar, 'text', "");
})();
