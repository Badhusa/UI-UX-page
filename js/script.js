(function(tables) {
    'use strict';

    $("#nav-toggle").click(function() {
        $("#navbar-collapse").toggleClass("collapsed");
        $(".navbar-toggle .icon-bar:nth-child(2)").toggleClass("rotate-back");
        $(".navbar-collapse").slideToggle("slow");
      });
    
    // Message input functionality
    $("#submit-message-btn").on("click", function(e) {
    e.preventDefault();
        var message = $(".form-control").val();

        if (message !== "") {
        $("#chat-box").append("<p>You: " + message + "</p>");
        $(".form-control").val("");
        }
    
    });

// Table input functionality
var tableCount = 1;

$("#add-table-btn").on("click", function(e) {
    e.preventDefault();
    if (tableCount < 10) {
      tableCount++;
  
      var newTableField = '<div class="table-field mt-4">';
      newTableField += '<div class="mb-3">';
      newTableField += '<label for="table-name-' + tableCount + '" class="form-label">Table ' + tableCount + ' name:</label>';
      newTableField += '<input type="text" class="form-control" id="table-name-' + tableCount + '" name="table-name-' + tableCount + '" required>';
      newTableField += '<div class="invalid-feedback">Please enter a table name.</div>';
      newTableField += '</div>';
      newTableField += '<div class="mb-3">';
      newTableField += '<label for="table-vars-' + tableCount + '" class="form-label">Table ' + tableCount + ' variables (comma-separated):</label>';
      newTableField += '<input type="text" class="form-control" id="table-vars-' + tableCount + '" name="table-vars-' + tableCount + '" placeholder="Enter comma-separated variable names">';
      newTableField += '</div>';
      newTableField += '</div>';
  
      $(".table-fields").append(newTableField);
    }
  
  });
  


$("#submit-tables-btn").on("click", function(e) {
  e.preventDefault();
  var tableData = {};
  var error = false;

  for (var i = 1; i <= tableCount; i++) {
    var tableName = $("#table-name-" + i).val();
    var tableVars = $("#table-vars-" + i).val().split(",").map(function(str) { return str.trim(); });

    if (tableName === "") {
      $("#table-name-" + i).addClass("is-invalid");
      error = true;
    } else {
      tableData["table-" + i] = { name: tableName, vars: tableVars };
    }
  }

  if (!error) {
    console.log(tableData);
    alert("Tables submitted!");
  }

});

    // Form submission
        $('form').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

            // Collect form data
            var formData = {};
            formData.tableCount = parseInt($('#table-num').val());
            formData.sqlOption = $('#sql-option').val();
            formData.tableSelect = $('#table-select').val();

            for (var i = 1; i <= formData.tableCount; i++) {
            var tableName = $('#table-name-' + i).val();
            var tableVariables = $('#table-variables-' + i).val();
            formData["table-" + i] = { name: tableName, variables: tableVariables };
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

        var selectedTable = $(this).val();
        var tableData = tables.filter(function(table) {
        return table.name === selectedTable;
    })[0];

    if (tableData) {
        var variables = tableData.variables;

        for (var i = 0; i < variables.length; i++) {
            // Create form inputs for each table variable
            var variableGroup = $('<div class="form-group"></div>');
            var variableLabel = $('<label for="variable-' + (i + 1) + '">' + variables[i] + '</label>');
            var variableInput = $('<input type="text" id="variable-' + (i + 1) + '" name="variable-' + (i + 1) + '">');

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
