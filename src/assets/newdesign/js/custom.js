$(document).ready(function() {
    
    for(i=0;i<10;i++){
        if ( $( "#table_"+i ).length ) {
            $("#table_"+i).DataTable();
        }
    }
    
    
    if ( $( "#prefporegistration" ).length ) {
        $('#prefporegistration').DataTable();
    }
    if ( $( "#postfporegistration" ).length ) {
        $('#postfporegistration').DataTable();
    }
    if ( $( "#SeedsTable" ).length ) {
        $('#SeedsTable').DataTable();
    }
    if ( $( "#FertilizerTable" ).length ) {
        $('#FertilizerTable').DataTable();
    }
    if ( $( "#AgriEqupmentTable" ).length ) {
        $('#AgriEqupmentTable').DataTable();
    }
    if ( $( "#AgriEqupmentBankTable" ).length ) {
        $('#AgriEqupmentBankTable').DataTable();
    }
    if ( $( "#ExportTable" ).length ) {
        $('#ExportTable').DataTable();
    }
    if ( $( "#OrganicFarmingTable" ).length ) {
        $('#OrganicFarmingTable').DataTable();
    }
    if ( $( "#SpecialCropTable" ).length ) {
        $('#SpecialCropTable').DataTable();
    }
    if ( $( "#Financetable" ).length ) {
        $('#Financetable').DataTable();
    }
    
                           
                           
                              
                               
                             
                             
} );

$(document).ready(function() {
$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-success").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("btn-success");   
});
}); 

$(function () {
        $(".demo1").bootstrapNews({
            newsPerPage: 2,
            autoplay: true,
			pauseOnHover:true,
            direction: 'up',
            newsTickerInterval: 2000,
			navigation: false,
            onToDo: function () {
                //console.log(this);
            }
        });
    });
jQuery(function ($) {
        var performance = [12, 3, 4, 2, 12, 3, 4, 17, 22, 34, 54, 67],
            visits = [3, 9, 12, 14, 22, 32, 45, 12, 67, 45, 55, 7],
            budget = [23, 19, 11, 134, 242, 352, 435, 22, 637, 445, 555, 57];

        $("#performance1").shieldChart({
            primaryHeader: {
                text: "Quarterly Performance"
            },
            dataSeries: [{
                seriesType: "area",
                collectionAlias: "Q Data",
                data: performance
            }]
        });

        $("#performance2").shieldChart({
            primaryHeader: {
                text: "Visitors"
            },
                axisX: {
                    categoricalValues: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
            dataSeries: [{
                seriesType: "bar",
                collectionAlias: "Visits",
                data: visits
            }]
        });

        $("#performance3").shieldChart({
            primaryHeader: {
                text: "Budget"
            },
            dataSeries: [{
                seriesType: "line",
                collectionAlias: "Budget",
                data: budget
            }]
        });
    });