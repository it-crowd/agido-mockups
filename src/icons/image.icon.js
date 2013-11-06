(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.image = new Kinetic.Group({name: "imageIcon", width: 24, height: 20});
    var border = new Kinetic.Polygon({
        points: [0, 0, 24, 0, 24, 20, 0, 20],
        fill: null,
        stroke: '#000',
        strokeWidth: 1
    });
    AgidoMockups.icons.image.add(border);

    AgidoMockups.icons.image.add(new Kinetic.Circle({x: 19, y: 5, radius: 2, fill: '#000', stroke: null}));

    var mountain = new Kinetic.Shape({
        fill: '#000',
        stroke: null,
        drawFunc: function (context)
        {
            context.beginPath();
            context.moveTo(3, 16);
            context.lineTo(7, 4);
            context.lineTo(13, 12);
            context.lineTo(16, 9);
            context.lineTo(21, 16);
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
    AgidoMockups.icons.image.add(mountain);
})();