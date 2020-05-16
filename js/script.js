function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getSalablePlayers(array) {
    return array
        .filter(function(item) { return item.salable; })
        .sort(function() { return .5 - Math.random() }) // Shuffle array
        .slice(0, 2);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function regenerate() {
    var aims, juvePlayers, titles;
    $.when(
        $.getJSON('./data/aims.json', function(data) {
            aims = data;
        }),
        $.getJSON('./data/juvePlayers.json', function(data) {
            juvePlayers = data;
        }),
        $.getJSON('./data/titles.json', function(data) {
            titles = data;
        })
    ).then(function() {
        const randomTitle = getRandomElement(titles).title;
        const randomJuvePlayer = getRandomElement(juvePlayers);
        const randomSalableJuvePlayer = getSalablePlayers(juvePlayers);
        const randomAims = aims
            .sort(function() { return .5 - Math.random() }) // Shuffle array
            .slice(0, 2); // Get first 2 items
        let replacements = {
            '%AIM%': randomAims[0].name,
            '%AIM2%': randomAims[1].name,
            '%JUVEPLAYER%': randomJuvePlayer.name,
            '%SALABLEJUVEPLAYER%': randomSalableJuvePlayer[0].name,
            '%SALABLEJUVEPLAYER2%': randomSalableJuvePlayer[1].name,
            '%BIGNUMBER%': randomIntFromInterval(60, 120),
            '%HUGENUMBER%': randomIntFromInterval(300, 500)
        };
        let definitiveTitle = randomTitle.replace(/%\w+%/g, function(all) {
            return replacements[all] || all;
        });

        $("#title").html(definitiveTitle);
    });
}

$("#regenerate").click(function() {
    regenerate();
});


regenerate();