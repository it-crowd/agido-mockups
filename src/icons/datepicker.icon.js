(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.datepicker = new Kinetic.Shape({
        name: "datepickerIcon",
        width: 24,
        height: 24,
        stroke: '#000',
        strokeWidth: 2,
        drawFunc: function (context)
        {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(20, 0);
            context.lineTo(20, 5);
            context.lineTo(0, 5);
            context.lineTo(0, 10);
            context.lineTo(20, 10);
            context.lineTo(20, 15);
            context.lineTo(0, 15);
            context.lineTo(0, 20);
            context.lineTo(20, 20);
            context.lineTo(20, 5);
            context.moveTo(16, 5);
            context.lineTo(16, 20);
            context.moveTo(12, 20);
            context.lineTo(12, 5);
            context.moveTo(8, 5);
            context.lineTo(8, 20);
            context.moveTo(4, 20);
            context.lineTo(4, 5);
            context.moveTo(0, 0);
            context.lineTo(0, 20);
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
})();