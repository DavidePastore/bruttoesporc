function randomIntFromInterval (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomYearFromNow () {
  const currentYear = new Date().getFullYear()
  return randomIntFromInterval(currentYear + 5, currentYear + 10)
}

function getRandomElements (array) {
  return array
    .sort(function () { return 0.5 - Math.random() }) // Shuffle array
}

function getSalablePlayers (array) {
  return getRandomElements(array
    .filter(function (item) { return item.salable }))
}

function getItalianTeams (array) {
  return getRandomElements(array
    .filter(function (item) { return item.isItalian }))
}

function createDefinitiveTitle (title, replacements) {
  return title.replace(/%\w+%/g, function (all) {
    return replacements[all] || all
  })
}

function findImage (title, replacements) {
  const imageToUse = '%' + title.imageToUse + '_IMAGE%'
  return replacements[imageToUse]
}

function getColorFromCategory (categories, category) {
  return categories.filter(function (item) { return item.name === category })[0].color
}

function regenerate () {
  var aims, juvePlayers, titles, otherTitles, opponentTeams, categories
  $.when(
    $.getJSON('./data/aims.json', function (data) {
      aims = data
    }),
    $.getJSON('./data/juvePlayers.json', function (data) {
      juvePlayers = data
    }),
    $.getJSON('./data/titles.json', function (data) {
      titles = data
    }),
    $.getJSON('./data/otherTitles.json', function (data) {
      otherTitles = data
    }),
    $.getJSON('./data/opponentTeams.json', function (data) {
      opponentTeams = data
    }),
    $.getJSON('./data/categories.json', function (data) {
      categories = data
    })
  ).then(function () {
    const randomTitle = getRandomElements(titles)[0].title
    const randomOtherTitles = getRandomElements(otherTitles)
    const randomJuvePlayer = getRandomElements(juvePlayers)
    const randomSalableJuvePlayer = getSalablePlayers(juvePlayers)
    const randomAims = getRandomElements(aims)
    const randomOpponentTeams = getRandomElements(opponentTeams)
    const randomItalianOpponentTeams = getItalianTeams(opponentTeams)
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
    }

    // Populate the main title
    $('#title').html(createDefinitiveTitle(randomTitle, replacements))

    let randomAimsIndex = 2
    let randomJuvePlayerIndex = 1
    let randomOpponentTeamsIndex = 1
    let randomOtherTitlesIndex = 0
    let randomItalianOpponentTeamsIndex = 0

    // Randomly populate all the other available titles
    $('.article-titles .article-to-edit').each(function (index, article) {
      replacements = {
        '%AIM%': randomAims[randomAimsIndex].name,
        '%AIM_IMAGE%': randomAims[randomAimsIndex].image,
        '%AIM2%': randomAims[randomAimsIndex + 1].name,
        '%AIM2_IMAGE%': randomAims[randomAimsIndex + 1].image,
        '%JUVEPLAYER%': randomJuvePlayer[randomJuvePlayerIndex].name,
        '%JUVEPLAYER_IMAGE%': randomJuvePlayer[randomJuvePlayerIndex].image,
        '%JUVEPLAYER2%': randomJuvePlayer[randomJuvePlayerIndex + 1].name,
        '%JUVEPLAYER2_IMAGE%': randomJuvePlayer[randomJuvePlayerIndex + 1].image,
        '%BIGNUMBER%': randomIntFromInterval(44, 60),
        '%HUGENUMBER%': randomIntFromInterval(300, 500),
        '%YEAR%': randomYearFromNow(),
        '%OPPONENTTEAM%': randomOpponentTeams[randomOpponentTeamsIndex].name,
        '%OPPONENTTEAM_IMAGE%': randomOpponentTeams[randomOpponentTeamsIndex].image,
        '%OPPONENTTEAM2%': randomOpponentTeams[randomOpponentTeamsIndex + 1].name,
        '%OPPONENTTEAM2_IMAGE%': randomOpponentTeams[randomOpponentTeamsIndex + 1].image,
        '%ITALIANOPPONENTTEAM%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].name,
        '%ITALIANOPPONENTTEAM_IMAGE%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].image
      }
      const $article = $(article)
      const randomOtherTitle = randomOtherTitles[randomOtherTitlesIndex]
      $article.find('.article-title')
        .html(createDefinitiveTitle(randomOtherTitle.title, replacements))
      const category = randomOtherTitle.category
      $article.find('.article-category')
        .html(category)
        .css('color', getColorFromCategory(categories, category))

      const imageToUse = findImage(randomOtherTitle, replacements)
      if (imageToUse) {
        $article.find('.article-image')
          .html('<img class="bd-placeholder-img article-image" width="200" height="250" src="' + imageToUse + '">')
      } else {
        $article.find('.article-image')
          .html('<svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>')
      }

      randomAimsIndex += 2
      randomJuvePlayerIndex += 2
      randomOpponentTeamsIndex += 2
      randomOtherTitlesIndex++
      randomItalianOpponentTeamsIndex++
    })
  })
}

$('#regenerate').click(function () {
  regenerate()
})

regenerate()
