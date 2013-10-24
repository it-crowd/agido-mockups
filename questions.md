#What is the use of addMethods?
Why do you write

    Kinetic.Util.addMethods(Kinetic.Group

instead of

    Kinetic.Group.prototype = {...}

?

#Why does drawFunc in object extending Group does not work?

#I want my component to be a facade, where to update children?
I want my Link component to contain Text and Line below text.
I don't want user to interact with Text or Line, just with Link (i.e. link.setText).
When should I update Text and Line children? In drawScene (Link extends Group)?