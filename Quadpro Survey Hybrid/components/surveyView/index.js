'use strict';

app.surveyView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_surveyView
// END_CUSTOM_CODE_surveyView
(function(parent) {
    var surveyViewModel = kendo.observable({
        fields: {
            spaceList: '',
            buildingList: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('surveyViewModel', surveyViewModel);
})(app.surveyView);

// START_CUSTOM_CODE_surveyViewModel
// END_CUSTOM_CODE_surveyViewModel