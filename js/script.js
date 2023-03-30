(function(tables) {
    'use strict';

    // Dynamically add table input fields based on user input
    $('#table-num').on('input', function() {
        let tableFields = $('.table-fields');
        tableFields.empty(); // Clear any previous input fields

        let tableCount = parseInt($(this).val());
        for (let i = 1; i <= tableCount; i++) {
            // Create form inputs for each table
            let tableGroup = $('<div class="form-group"></div>');
            let nameLabel = $('<label for="table-name-' + i + '">Table ' + i + ' Name</label>');
            let nameInput = $('<input type="text" id="table-name-' + i + '" name="table-name-' + i + '">');
            let variableLabel = $('<label for="table-variables-' + i + '">Table ' + i + ' Variables</label>');
            let variableInput = $('<textarea id="table-variables-' + i + '" name="table-variables-' + i + '" rows="5"></textarea>');

            // Add form inputs to the DOM
            tableGroup.append(nameLabel);
            tableGroup.append(nameInput);
            tableGroup.append(variableLabel);
            tableGroup.append(variableInput);
            tableFields.append(tableGroup);
        }
    });

    // Form submission
    $('form').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Collect form data
        let formData = {};
        formData['tableCount'] = parseInt($('#table-num').val());
        formData['sqlOption'] = $('#sql-option').val();
        formData['tableSelect'] = $('#table-select').val();

        for (let i = 1; i <= formData['tableCount']; i++) {
            let tableName = $('#table-name-' + i).val();
            let tableVariables = $('#table-variables-' + i).val();
            formData['table-' + i] = { name: tableName, variables: tableVariables };
        }

        // Send data to server using AJAX
        $.ajax({
            type: 'POST',
            url: '/submit',
            data: JSON.stringify(formData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(response) {
                alert('Form submitted successfully!');
            },
            error: function(xhr, status, error) {
                alert('Form submission failed. Error: ' + error);
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
                // Create form inputs for each table variable
                let variableGroup = $('<div class="form-group"></div>');
                let variableLabel = $('<label for="variable-' + (i + 1) + '">' + variables[i] + '</label>');
                let variableInput = $('<input type="text" id="variable-' + (i + 1) + '" name="variable-' + (i + 1) + '">');

                // Add form inputs to the DOM
                variableGroup.append(variableLabel);
                variableGroup.append(variableInput);
                tableVariables.append(variableGroup);
                }
                }
                });
                
                // Enable tooltips
                $('[data-toggle="tooltip"]').tooltip();
    
    
    })();
