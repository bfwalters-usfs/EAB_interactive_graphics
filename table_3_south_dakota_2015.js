$(document).ready(function() 
    { 
        $("#spp").tablesorter({
			headers: {0: {sorter: false}},
			sortList: [[4,1]]});
    }
);