agidoMockups.directive('suggest', ["$timeout", function ($timeout)
{
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, iElement, iAttrs)
        {
            //noinspection JSUnresolvedVariable
            iElement.autocomplete({
                source: scope[iAttrs.suggest],
                select: function (event, ui)
                {
                    $timeout(function ()
                    {
                        iElement.val('');
//                        noinspection JSUnresolvedVariable
                        var suggestSelectName = iAttrs.suggestSelect;
                        var suggestSelect = scope[suggestSelectName];
                        if (suggestSelect instanceof Function) {
                            suggestSelect(ui.item);

                        } else if (undefined != suggestSelectName) {
                            throw new Error("Method " + suggestSelectName + " not found in scope");
                        }
                    }, 0);
                    return false;
                }
            });
        }
    };
}]);