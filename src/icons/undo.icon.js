(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.undo = new Kinetic.Shape({
        name: "undoIcon",
        width: 18,
        height: 22,
        fill: '#000',
        stroke: null,
        drawFunc: function (context)
        {
            context.beginPath();
            context.moveTo(0, 8);
            context.lineTo(8, 0);
            context.lineTo(8, 4);
            context.quadraticCurveTo(27, 8, 15, 22);
            context.quadraticCurveTo(19, 11, 8, 10);
            context.lineTo(8, 14);
            context.lineTo(0, 8);
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
})();