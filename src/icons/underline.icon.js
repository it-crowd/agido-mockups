(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.underline = new Kinetic.Group({name: "underlineIcon", width: 18, height: 20});
    AgidoMockups.icons.underline.add(new Kinetic.Text({text: "U", fill: '#000', fontSize: 20, fontStyle: 'normal'}));
    AgidoMockups.icons.underline.add(new Kinetic.Line({
        points: [1, 19, 13, 19],
        stroke: '#000',
        strokeWidth: 1
    }));
})();