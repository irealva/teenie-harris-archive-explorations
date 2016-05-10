var waytags = [
    "black",
    "white",
    "photograph",
    "black and white",
    "pet",
    "mammal",
    "dog",
    "puppy",
    "person",
    "man",
    "photography",
    "people",
    "male",
    "family",
    "woman",
    "child",
    "lady",
    "human action",
    "martial arts",
    "sports",
    "contact sport",
    "physical exercise",
    "combat sport",
    "team",
    "class",
    "basketball",
    "art",
    "dance",
    "basketball moves",
    "stage",
    "athlete",
    "ballet",
    "road",
    "city",
    "street",
    "portrait",
    "document",
    "major appliance",
    "collage",
    "dress",
    "painting",
    "darkness",
    "bride",
    "music",
    "musician",
    "performance",
    "bandoneon",
    "sketch",
    "book",
    "bassist",
    "string instrument",
    "profession",
    "rock",
    "musical ensemble",
    "guitar",
    "musical instrument",
    "guitarist",
    "tavern",
    "film noir",
    "photo shoot",
    "automobile",
    "vehicle",
    "classic car",
    "sports car",
    "land vehicle",
    "mode of transport",
    "alfa romeo giulietta",
    "mid size car",
    "sedan",
    "coupé",
    "mercedes benz 190sl",
    "portrait photography",
    "girl",
    "downtown",
    "keyboard",
    "auditorium",
    "grocery store",
    "restaurant",
    "interior design",
    "crowd",
    "clothing",
    "model",
    "fashion",
    "showgirl",
    "sea",
    "flight",
    "player",
    "baseball equipment",
    "athletics",
    "track and field athletics",
    "pole vault",
    "jumping",
    "audience",
    "party",
    "ceremony",
    "nightclub",
    "hacienda",
    "transport",
    "residential area",
    "track",
    "cityscape",
    "suburb",
    "groom",
    "tuxedo",
    "ritual",
    "image",
    "picture frame",
    "photomontage",
    "modern art",
    "drawing",
    "choir",
    "color",
    "structure",
    "house",
    "window",
    "facade",
    "business",
    "religion",
    "furniture",
    "chair",
    "bed",
    "demonstration",
    "visual arts",
    "wedding",
    "snow",
    "town",
    "youth",
    "still life",
    "sculpture",
    "wall",
    "still life photography",
    "meal",
    "dinner",
    "vintage car",
    "hot rod",
    "engine",
    "sport utility vehicle",
    "race car",
    "auto racing",
    "singing",
    "commercial vehicle",
    "bus",
    "lingerie",
    "air raid shelter",
    "slum",
    "cello",
    "phenomenon",
    "wedding reception",
    "urban area",
    "van",
    "truck",
    "rolling stock",
    "freight transport",
    "architecture",
    "public transport",
    "beauty"
];

var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 1200,
    isFitWidth: true
        //columnWidth: '.grid-sizer',
        //percentPosition: true
});

$grid.imagesLoaded().progress(function() {
    $grid.masonry('layout');
});

$(window).load(function() {
    for (i = 0; i < waytags.length; i++) {
        var listelement = "<a href='#' class='list-group-item'>" + waytags[i] + "</a>"

        $(".list-group").append(listelement);
    }

    $('a.list-group-item').click(function(e) {
        var tag = e.target.innerHTML;
        loadjson(tag);
    });
});

var images_to_load = [];

//Load a new json file with ways
function loadjson(tag) {
    images_to_load = [];

    $.getJSON("concatimagedata.json", function(json) {
            //console.log(tag) ;
            //console.log(json); // this will show the info it in firebug console
        })
        .success(function(json) { parsejson(json.image_labels, tag) });
};

function parsejson(json, tag) {
    remove_images();
    //console.log(json.length) ;

    for (i = 0; i < json.length; i++) {
        var name = json[i].name;
        //console.log(name) ;

        var annotations = json[i].responses[0].labelAnnotations;
        //console.log(annotations) ;
        // //console.log(annotations) ;
        var test = check_if_tag(annotations, tag);
        if (test) {
            //console.log("true") ;
            full_name = "images/" + name.substr(0, 7) + "/" + name.substr(7, 10) + ".png"

            console.log(full_name);
            images_to_load.push(name);

            var div = '<div class="grid-item grid-item--width2"><img src="' + full_name + '"width="100%"></div>';

            $('.grid').append(div);
        }
    }

    //load_images() ;
};

function check_if_tag(annotations, tag) {
    if (typeof annotations != 'undefined') {
        var size = annotations.length;
        for (items in annotations) {
            if (annotations[items].description == tag) {
                return true;
            }
        }
    }

};

function load_images() {
    for (items in images_to_load) {
        //console.log(images_to_load[items]) ;
    }
}

function remove_images() {
    $(".grid-item").remove();
}