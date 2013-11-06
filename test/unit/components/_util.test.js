describe("parseTable", function ()
{

    it("should create separate row for each", function ()
    {
//        Given
        var textA = "a,b,[]";
        var textB = "a,b,[]\nsecond row";

//        When
        var resultA = AgidoMockups.parseTable(textA, true);
        var resultB = AgidoMockups.parseTable(textB, false);

//        Then
        expect(resultA.rows.length).toBe(1);
        expect(resultB.rows.length).toBe(2);
    });

    it("should not create separate row for last line surrounded with {}", function ()
    {
//        Given
        var textA = "a,b,\n{}";
        var textB = "a,b,[]\nsecond row,\na,s,d\n{a, b , 0R}";

//        When
        var resultA = AgidoMockups.parseTable(textA);
        var resultB = AgidoMockups.parseTable(textB);

//        Then
        expect(resultA.rows.length).toBe(1);
        expect(resultB.rows.length).toBe(3);
    });

    it("should parse row into columns", function ()
    {
//        Given
        var textA = "a,b,\na\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA);

//        Then
        expect(resultA.rows[0].columns.length).toBe(3);
        expect(resultA.rows[1].columns.length).toBe(1);
        expect(resultA.rows[1].columns[0].tokens[0].text).toBe("a,c");
        expect(resultA.rows[2].columns.length).toBe(1);

    });

    it("should add arrow down to column", function ()
    {
//        Given
        var textA = "a v,bv, v,\na v\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA, true);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(2);
        expect(resultA.rows[0].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[1].tokens[0].text).toBe("bv");
        expect(resultA.rows[0].columns[2].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[2].tokens[0].text).toBe(" v");
        expect(resultA.rows[0].columns[3].tokens.length).toBe(0);
        expect(resultA.rows[1].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[0].tokens[0].text).toBe("a v,c");
    });


    it("should do not add arrow down if not header mode", function ()
    {
//        Given
        var textA = "a v,bv, v,\na v\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA, false);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("a v");
    });

    it("should add arrow up to column", function ()
    {
//        Given
        var textA = "a ^,b^, ^,\na ^\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA, true);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(2);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("a ");
        expect(resultA.rows[0].columns[0].tokens[1].icon).toBe("arrowUp");
        expect(resultA.rows[0].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[1].tokens[0].text).toBe("b^");
        expect(resultA.rows[0].columns[2].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[2].tokens[0].text).toBe(" ^");
        expect(resultA.rows[0].columns[3].tokens.length).toBe(0);
        expect(resultA.rows[1].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[0].tokens[0].text).toBe("a ^,c");
    });

    it("should do not add arrow up if not header mode", function ()
    {
//        Given
        var textA = "a ^,b^, ^,\na ^\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA, false);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("a ^");
    });

    it("should with header by default", function ()
    {
//        Given
        var textA = "a ^,b^, ^,\na ^\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(2);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("a ");
        expect(resultA.rows[0].columns[0].tokens[1].icon).toBe("arrowUp");
    });

    it("should add arrow up-down to column", function ()
    {
//        Given
        var textA = "a ^v,b^v, ^v,\na ^v\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA, true);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(2);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("a ");
        expect(resultA.rows[0].columns[0].tokens[1].icon).toBe("arrowUpDown");
        expect(resultA.rows[0].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[1].tokens[0].text).toBe("b^v");
        expect(resultA.rows[0].columns[2].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[2].tokens[0].text).toBe(" ^v");
        expect(resultA.rows[0].columns[3].tokens.length).toBe(0);
        expect(resultA.rows[1].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[0].tokens[0].text).toBe("a ^v,c");
    });

    it("should do not add arrow up-down if not header mode", function ()
    {
//        Given
        var textA = "a ^v,b^v, ^v,\na ^v\\,c\n";

//        When
        var resultA = AgidoMockups.parseTable(textA, false);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("a ^v");
    });

    it("should add checkbox", function ()
    {
//        Given
        var textA = "[] ,b [], [ x],\n [], [] \n[] a";

//        When
        var resultA = AgidoMockups.parseTable(textA, false);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[0].tokens[0].checkbox).toBe(false);
        expect(resultA.rows[0].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[1].tokens[0].text).toBe("b []");
        expect(resultA.rows[0].columns[2].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[2].tokens[0].checkbox).toBe(true);
        expect(resultA.rows[1].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[0].tokens[0].checkbox).toBe(false);
        expect(resultA.rows[1].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[1].tokens[0].checkbox).toBe(false);
        expect(resultA.rows[2].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[2].columns[0].tokens[0].text).toBe("[] a");
    });

    it("should add radio", function ()
    {
//        Given
        var textA = "() ,b (), ( o ),\n (), ( ) \n() a";

//        When
        var resultA = AgidoMockups.parseTable(textA, false);

//        Then
        expect(resultA.rows[0].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[0].tokens[0].radio).toBe(false);
        expect(resultA.rows[0].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[1].tokens[0].text).toBe("b ()");
        expect(resultA.rows[0].columns[2].tokens.length).toBe(1);
        expect(resultA.rows[0].columns[2].tokens[0].radio).toBe(true);
        expect(resultA.rows[1].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[0].tokens[0].radio).toBe(false);
        expect(resultA.rows[1].columns[1].tokens.length).toBe(1);
        expect(resultA.rows[1].columns[1].tokens[0].radio).toBe(false);
        expect(resultA.rows[2].columns[0].tokens.length).toBe(1);
        expect(resultA.rows[2].columns[0].tokens[0].text).toBe("() a");
    });

    it("should parse column sizes and alignment settings", function ()
    {
//        Given
        var textA = "a,b,\n{}";
        var textB = "a,b,[]\nsecond row,,,,,,,\na,s,d\n{65L, 0R, 35, 0C, L,}";

//        When
        var resultA = AgidoMockups.parseTable(textA);
        var resultB = AgidoMockups.parseTable(textB);

//        Then
        expect(resultA.rows.length).toBe(1);
        expect(resultA.columns.length).toBe(0);
        expect(resultB.rows.length).toBe(3);
        expect(resultB.columns.length).toBe(5);
        expect(resultB.columns[0].width).toBe(65);
        expect(resultB.columns[0].align).toBe("L");
        expect(resultB.columns[1].width).toBe(0);
        expect(resultB.columns[1].align).toBe("R");
        expect(resultB.columns[2].width).toBe(35);
        expect(resultB.columns[2].align).toBeUndefined();
        expect(resultB.columns[3].width).toBe(0);
        expect(resultB.columns[3].align).toBe("C");
        expect(resultB.columns[4].width).toBeUndefined();
        expect(resultB.columns[4].align).toBe("L");
    });

    it("should handle \\r", function ()
    {
//        Given
        var textA = "First\\rlast name ^,b,[]";

//        When
        var resultA = AgidoMockups.parseTable(textA, true);

//        Then
        expect(resultA.rows.length).toBe(1);
        expect(resultA.rows[0].columns[0].tokens[0].text).toBe("First\\rlast name ");
    });

});