$(document).ready(function() {
    $('select.dropdown').dropdown();
    $('.ui.radio.checkbox').checkbox();
    $('.ui.form').form({
        fields: {
            name: 'empty',
            email: 'email',
            employed: 'exactCount[1]',
            purpose: 'exactCount[1]',
            familiarity: 'minCount[1]'
        }
    });
});
