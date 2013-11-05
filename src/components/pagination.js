(function ()
{

    Kinetic.Pagination = function (config)
    {
        this.____init(config);
    };
    Kinetic.Pagination.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Pagination";
            var x = 0;
            var arrowWidth = 10;
            var space = arrowWidth * 2;
            var y = 5;
            this.add(AgidoMockups.icons.arrowLeft.clone({x: x, y: y}));
            this.add(AgidoMockups.icons.arrowLeft.clone({x: x += arrowWidth, y: y}));
            this.add(AgidoMockups.icons.arrowLeft.clone({x: x += space, y: y}));
            this.add(AgidoMockups.icons.arrowRight.clone({x: x += space * 3, y: 0, scale: 2}));
            this.add(AgidoMockups.icons.arrowRight.clone({x: x += space * 2, y: y}));
            this.add(AgidoMockups.icons.arrowRight.clone({x: x += space, y: y}));
            this.add(AgidoMockups.icons.arrowRight.clone({x: x += arrowWidth, y: y}));
            this.setWidth(x);
            this.setHeight(y * 4);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Pagination, Kinetic.Group);
})();
