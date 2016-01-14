// JavaScript for PharmGKB MySQL database search
// Written for custom database
// Author: Brent Key

// Executes search via an AJAX call
function runSearch( term ) {
    // hide and clear the previous results, if any
    $('#results').hide();
    $('tbody').empty();

    // transforms all form parameters into a string to send to the server
    var frmStr = $('#dg_search').serialize();

    $.ajax({
        url: './pgkb_search.cgi',
        dataType: 'json',
        data: frmStr,
        success: function(data, textStatus, jqXHR) {
            processJSON(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform search! textStatus: (" + textStatus + ") and errorThrown: (" + errorThrown + ")");
        }
    });
}


// process JSON structure representing drug or gene matches and formats
//  it for the result table
function processJSON( data ) {
    // set the span that lists the match count
    $('#match_count').text( data.match_count );

    // track row identifiers
    var next_row_num = 1;

    // iterate over each match and add a row to the result table for each
    $.each( data.matches, function(i, item) {
        var this_row_id = 'result_row_' + next_row_num++;

        // create a row and append it to the body of the table   
        $('<tr/>', { "id" : this_row_id } ).appendTo('tbody');

        // add columns for each item selected in SQL query
        $('<td/>', { "text" : item.drug_name} ).appendTo('#' + this_row_id);
        $('<td/>', { "text" : item.generic_name } ).appendTo('#' + this_row_id);       
        $('<td/>', { "text" : item.trade_name} ).appendTo('#' + this_row_id);          
        $('<td/>', { "text" : item.ref_snp } ).appendTo('#' + this_row_id);
        $('<td/>', { "text" : item.drug_approval } ).appendTo('#' + this_row_id);
        $('<td/>', { "text" : item.testing } ).appendTo('#' + this_row_id);
        $('<td/>', { "text" : item.chrom} ).appendTo('#' + this_row_id);
        $('<td/>', { "text" : item.gene_name } ).appendTo('#' + this_row_id);
        $('<td/>', { "text" : item.gene_symbol } ).appendTo('#' + this_row_id);
    });

    // shows result section
    $('#results').show();
}


$(document).ready( function() {
    //autocomplete on user input, search_term
    $('#search_term').autocomplete({
        //no autocomplete until 2 characters typed
        minLength: 2,
        //take product description from returned json data using cgi script
        source: function(request, response){
            $.ajax({
                url: './pgkb_search.cgi',
                dataType: 'json',
                type: 'Get',
                data: {q: true},
                //map data to correct format, limit displayed autocomplete data to 5 terms
                //only show autocomplete from drug name and gene name columns
                //add ajax jquery-ui script to html file
                success: function(data, textStatus, jqXHR){
                    var rslts= $.ui.autocomplete.filter(data, request.term);
                    response($.map(rslts, function(item){
                        return { label: item.drug_name, value: item.gene_name }
                    }).slice(0,5)); 
                },
                //throw error if something doesn't work
                error: function(jqXHR, textStatus, errorThrown){
                    alert("Failed to perform gene search! textStatus: (" + textStatus + ") and errorThrown: (" + errorThrown + ")");
                }
            });
        }

    });
});

// run javascript once the page is ready
$(document).ready( function() {
// user chooses submit on html form          
    $('#submit').click( function() {
        runSearch();
        return false;  // prevents 'normal' form submission
    });
});
              
