(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};

    var PIx2 = (Math.PI * 2) - 0.0001;
    AgidoMockups.icons.search = new Kinetic.Shape({
        name: "searchIcon",
        stroke: '#000',
        drawFunc: function (context)
        {
            context.beginPath();
            context.arc(0, 0, 5, 0, PIx2, false);
            context.closePath();
            context.moveTo(8, 8);
            context.lineTo(3, 3);
            context.fillStrokeShape(this);

        }
    });
})();
