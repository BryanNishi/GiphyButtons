$(document).ready(function () {
    var cars = ["Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Dodge", "Chevrolet", "Ferarri", "Fiat", "Ford", "Lamborghini", "McLaren", "Mercedes Benz", "Mitsubishi", "Porche", "Subaru"]
    var newGifs = 0;

    function renderButtons() {
        $("#carButtons").empty();
        $.each(cars, function (value, element) {
            var newBtn = $("<button class='btn car'>" + element + "</button>");

            $("#carButtons").append(newBtn)

        })
    }

    $("#addCar").on("click", function (event) {
        event.preventDefault();
        var input = $("#carInput").val().trim();
        if (input === " ") {
            return false;
        } else {
            cars.push(input);
            renderButtons();
        }
    });
    renderButtons()

    $(document).on("click", ".car", function () {
        console.log("btn trigger");
        var car = $(this).text();
        console.log(car);
        var queryURL = "https://api.giphy.com/v1/gifs/search";

        $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    q: car,
                    limit: 10,
                    offset: newGifs,
                    apikey: "mfbfV1C9OLl4XORzq6rzKHlY3UaiSJiU",
                }
            })
            .then(function (response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>").addClass("gifs");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);


                    var carImage = $("<img id='gif'>");
                    carImage.attr("src", results[i].images.fixed_height_still.url, );

                    gifDiv.prepend(p);
                    gifDiv.prepend(carImage);

                    $("#carGifs").prepend(gifDiv);
                    $("#gif").on("click", function () {
                        console.log(this);
                        src = this.src;
                        //change src into an array by removing the underscore and check if last index is equal to 's.gif'
                        if ($(src.split("_")).last()[0] == "s.gif")
                            //if last index url is image, change to animated gif
                            $(this).attr('src', src.replace('_s.gif', '.gif'));
                        else
                            //if last index url is animated, change to still image
                            $(this).attr('src', src.replace('.gif', '_s.gif'));

                    })
                }
                newGifs += 10;

            });

    });

});