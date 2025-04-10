$(document).ready(function () {
    function loadShareholders(page = 1) {
        let name = $("#nameSearch").val();
        let email = $("#emailSearch").val();

        $.ajax({
            url: baseUrl + "/shareholders/data",
            type: "GET",
            data: { page: page, name: name, email: email },
            dataType: "json",
            beforeSend: function () {
                $("#loader").fadeIn();
            },
            success: function (response) {
                $("#shareholdersTable tbody").html(response.table);
                $("#paginationContainer").html(response.pagination);
                $("#totalUsers").html(response.totalUsers.toLocaleString('en-GB'));
            },
            error: function () {
                alert("Error loading shareholders.");
            },
            complete: function () {
                $("#loader").fadeOut();
            }
        });
    }

    $("#searchForm").submit(function (e) {
        e.preventDefault();
        loadShareholders();
    });

    loadShareholders();
});
