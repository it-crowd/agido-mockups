(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.bulletList = new Kinetic.Group({name: "bulletListIcon", width: 24, height: 23});
    AgidoMockups.icons.bulletList.add(new Kinetic.Circle({x: 4, y: 5, radius: 2, fill: '#000', stroke: null}));
    AgidoMockups.icons.bulletList.add(new Kinetic.Line({points: [9, 5, 24, 5], stroke: '#000', strokeWidth: 3}));
    AgidoMockups.icons.bulletList.add(new Kinetic.Circle({x: 4, y: 13, radius: 2, fill: '#000', stroke: null}));
    AgidoMockups.icons.bulletList.add(new Kinetic.Line({points: [9, 13, 24, 13], stroke: '#000', strokeWidth: 3}));
    AgidoMockups.icons.bulletList.add(new Kinetic.Circle({x: 4, y: 21, radius: 2, fill: '#000', stroke: null}));
    AgidoMockups.icons.bulletList.add(new Kinetic.Line({points: [9, 21, 24, 21], stroke: '#000', strokeWidth: 3}));
})();