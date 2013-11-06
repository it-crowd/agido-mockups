(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.redo = new Kinetic.Shape({
        name: "redoIcon",
        width: 18,
        height: 22,
        fill: '#000',
        stroke: null,
        drawFunc: function (context)
        {
            context.beginPath();
            context.moveTo(18, 8);
            context.lineTo(10, 0);
            context.lineTo(10, 4);
            context.quadraticCurveTo(-9, 8, 3, 22);
            context.quadraticCurveTo(-1, 11, 10, 10);
            context.lineTo(10, 14);
            context.lineTo(18, 8);
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
})();