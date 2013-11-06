(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.numberedList = new Kinetic.Group({name: "numberedListIcon", width: 24, height: 23});
    AgidoMockups.icons.numberedList.add(new Kinetic.Text({text: "1", x: 2, y: 0, fill: '#000', fontSize: 10, fontStyle: 'bold'}));
    AgidoMockups.icons.numberedList.add(new Kinetic.Line({points: [9, 5, 24, 5], stroke: '#000', strokeWidth: 3}));
    AgidoMockups.icons.numberedList.add(new Kinetic.Text({text: "2", x: 2, y: 8, fill: '#000', fontSize: 10, fontStyle: 'bold'}));
    AgidoMockups.icons.numberedList.add(new Kinetic.Line({points: [9, 13, 24, 13], stroke: '#000', strokeWidth: 3}));
    AgidoMockups.icons.numberedList.add(new Kinetic.Text({text: "3", x: 2, y: 16, fill: '#000', fontSize: 10, fontStyle: 'bold'}));
    AgidoMockups.icons.numberedList.add(new Kinetic.Line({points: [9, 21, 24, 21], stroke: '#000', strokeWidth: 3}));
})();