(function(tables){
    'use strict';
// Dynamically add table input fields based on user input
$('#table-num').on('input', function() {
    let tableFields = $('.table-fields');
    tableFields.empty(); // Clear any previous input fields

    let tableCount = parseInt($(this).val());
    for (let i = 1; i <= tableCount; i++) {
        let tableGroup = $('<div class="form-group"></div>');
        let nameLabel = $('<label for="table-name-' + i + '">Table ' + i + ' Name</label>');
        let nameInput = $('<input type="text" id="table-name-' + i + '" name="table-name-' + i + '">');
        let variableLabel = $('<label for="table-variables-' + i + '">Table ' + i + ' Variables</label>');
        let variableInput = $('<textarea id="table-variables-' + i + '" name="table-variables-' + i + '" rows="5"></textarea>');

        tableGroup.append(nameLabel);
        tableGroup.append(nameInput);
        tableGroup.append(variableLabel);
        tableGroup.append(variableInput);
        tableFields.append(tableGroup);
    }
});

// Form submission
$('form').on('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting

    // Collect form data
    let message = $('input[type="text"]').val();
    let tableCount = parseInt($('#table-num').val());
    let tables = [];
    for (let i = 1; i <= tableCount; i++) {
        let tableName = $('#table-name-' + i).val();
        let tableVariables = $('#table-variables-' + i).val().split('\n').map(function(variable) {
            return variable.trim();
        }).filter(function(variable) {
            return variable !== '';
        });

        tables.push({
            name: tableName,
            variables: tableVariables
        });
    }
    let sqlOption = $('#sql-option').val();

    // Display data in console (for testing purposes)
    console.log('Message:', message);
    console.log('Tables:', tables);
    console.log('SQL Option:', sqlOption);

    // Submit form data to server using AJAX
    $.ajax({
        url: '/submit-data',
        method: 'POST',
        data: {
            message: message,
            tables: tables,
            sqlOption: sqlOption
        },
        success: function(response) {
            // Display success message to user
            alert('Data submitted successfully!');
        },
        error: function() {
            // Display error message to user
            alert('Error submitting data. Please try again.');
        }
    });
});

// Display table variables based on table selection
$('#table-select').on('change', function() {
    let tableVariables = $('#table-variables');
    tableVariables.empty(); // Clear any previous table variables

    let selectedTable = $(this).val();
    let tableData = tables.filter(function(table) {
        return table.name === selectedTable;
    })[0];

    if (tableData) {
        let variables = tableData.variables;
        for (let i = 0; i < variables.length; i++) {
            let variableGroup = $('<div class="form-group"></div>');
            let variableLabel = $('<label for="variable-' + (i + 1) + '">' + variables[i] + '</label>');
            let variableInput = $('<input type="text" id="variable-' + (i + 1) + '" name="variable-' + (i + 1) + '">');

            variableGroup.append(variableLabel);
            variableGroup.append(variableInput);
            tableVariables.append(variableGroup);
            }
            }
            });
            
            // Enable tooltips
            $('[data-toggle="tooltip"]').tooltip();


})();