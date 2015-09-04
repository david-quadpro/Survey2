'use strict';

app.siteListView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_siteListView
// END_CUSTOM_CODE_siteListView
(function(parent) {
    var dataProvider = app.data.defaultProvider,
        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        // Location type property
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Site',
                dataProvider: dataProvider
            },

            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    flattenLocationProperties(dataItem);
                }
            },
            schema: {
                model: {
                    fields: {
                        'Name': {
                            field: 'Name',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        siteListViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/buildingListView/view.html?siteID=' + e.dataItem.id);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = siteListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                if (!itemModel.Name) {
                    itemModel.Name = String.fromCharCode(160);
                }
                siteListViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('siteListViewModel', siteListViewModel);
})(app.siteListView);

// START_CUSTOM_CODE_siteListViewModel
// END_CUSTOM_CODE_siteListViewModel