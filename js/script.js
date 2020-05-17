function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomYearFromNow() {
    let currentYear = new Date().getFullYear();
    return randomIntFromInterval(currentYear + 5, currentYear + 10);
}

function getRandomElements(array) {
    return array
        .sort(function() { return .5 - Math.random() }); // Shuffle array
}

function getSalablePlayers(array) {
    return getRandomElements(array
            .filter(function(item) { return item.salable; }));
}

function getItalianTeams(array) {
    return getRandomElements(array
            .filter(function(item) { return item.isItalian; }));
}

function createDefinitiveTitle(title, replacements) {
    return title.replace(/%\w+%/g, function(all) {
        return replacements[all] || all;
    });
}

function getColorFromCategory(categories, category) {
    return categories.filter(function(item) { return item.name === category; })[0].color;
}


function regenerate() {
    var aims, juvePlayers, titles, otherTitles, opponentTeams, categories;
    $.when(
        $.getJSON('./data/aims.json', function(data) {
            aims = data;
        }),
        $.getJSON('./data/juvePlayers.json', function(data) {
            juvePlayers = data;
        }),
        $.getJSON('./data/titles.json', function(data) {
            titles = data;
        }),
        $.getJSON('./data/otherTitles.json', function(data) {
            otherTitles = data;
        }),
        $.getJSON('./data/opponentTeams.json', function(data) {
            opponentTeams = data;
        }),
        $.getJSON('./data/categories.json', function(data) {
            categories = data;
        }),
    ).then(function() {
        const randomTitle = getRandomElements(titles)[0].title;
        const randomOtherTitles = getRandomElements(otherTitles);
        const randomJuvePlayer = getRandomElements(juvePlayers);
        const randomSalableJuvePlayer = getSalablePlayers(juvePlayers);
        const randomAims = getRandomElements(aims);
        const randomOpponentTeams = getRandomElements(opponentTeams);
        const randomItalianOpponentTeams = getItalianTeams(opponentTeams);
        let replacements = {
            '%AIM%': randomAims[0].name,
            '%AIM2%': randomAims[1].name,
            '%JUVEPLAYER%': randomJuvePlayer[0].name,
            '%SALABLEJUVEPLAYER%': randomSalableJuvePlayer[0].name,
            '%SALABLEJUVEPLAYER2%': randomSalableJuvePlayer[1].name,
            '%BIGNUMBER%': randomIntFromInterval(60, 120),
            '%HUGENUMBER%': randomIntFromInterval(300, 500),
            '%YEAR%': randomYearFromNow(),
            '%OPPONENTTEAM%': randomOpponentTeams[0].name
        };

        // Populate the main title
        $("#title").html(createDefinitiveTitle(randomTitle, replacements));

        let randomAimsIndex = 2;
        let randomJuvePlayerIndex = 1;
        let randomOpponentTeamsIndex = 1;
        let randomOtherTitlesIndex = 0;
        let randomItalianOpponentTeamsIndex = 0;

        // Randomly populate all the other available titles
        $(".article-titles .article-to-edit").each(function(index, article) {
            replacements = {
                '%AIM%': randomAims[randomAimsIndex].name,
                '%AIM2%': randomAims[randomAimsIndex + 1].name,
                '%JUVEPLAYER%': randomJuvePlayer[randomJuvePlayerIndex].name,
                '%BIGNUMBER%': randomIntFromInterval(44, 60),
                '%HUGENUMBER%': randomIntFromInterval(300, 500),
                '%YEAR%': randomYearFromNow(),
                '%OPPONENTTEAM%': randomOpponentTeams[randomOpponentTeamsIndex].name,
                '%ITALIANOPPONENTTEAM%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].name
            };
            let $article = $(article);
            let randomOtherTitle = randomOtherTitles[randomOtherTitlesIndex];
            $article.find(".article-title")
                .html(createDefinitiveTitle(randomOtherTitle.title, replacements));
            let category = randomOtherTitle.category;
            $article.find(".article-category")
                .html(category)
                .css('color', getColorFromCategory(categories, category));
            
            randomAimsIndex += 2;
            randomJuvePlayerIndex++;
            randomOpponentTeamsIndex++;
            randomOtherTitlesIndex++;
            randomItalianOpponentTeamsIndex++;
        });
    });
}

$("#regenerate").click(function() {
    regenerate();
});


regenerate();