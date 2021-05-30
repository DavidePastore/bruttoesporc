import React from 'react';
import './Newspaper.css';
import MainTitle from '../MainTitle/MainTitle';
import Title from '../Title/Title';
import Footer from '../Footer/Footer';

class Newspaper extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      aims: [],
      juvePlayers: [],
      titles: [],
      otherTitles: [],
      opponentTeams: [],
      categories: [],
      showLoader: true,
      mainTitle: 'This is the first main title',
      titlesToUse: []
    };

    this.handleGenerateTitles = this.handleGenerateTitles.bind(this);
  }

  componentDidMount () {
    Promise.all([
      window.fetch('./data/aims.json'),
      window.fetch('./data/juvePlayers.json'),
      window.fetch('./data/titles.json'),
      window.fetch('./data/otherTitles.json'),
      window.fetch('./data/opponentTeams.json'),
      window.fetch('./data/categories.json')
    ]).then(result => Promise.all(result.map(v => v.json())))
      .then(([aims, juvePlayers, titles, otherTitles, opponentTeams, categories]) => {
        this.setState({
          aims: aims,
          juvePlayers: juvePlayers,
          titles: titles,
          otherTitles: otherTitles,
          opponentTeams: opponentTeams,
          categories: categories
        });

        this.handleGenerateTitles();
      }).catch((err) => {
        console.error(err);
      });
  }

  handleGenerateTitles () {
    // Generate the titles
    const randomTitle = this.getRandomElements(this.state.titles)[0].title;
    const randomOtherTitles = this.getGoodTitles(this.state.otherTitles);
    const randomBadTitles = this.getBadTitles(this.state.otherTitles);
    const randomJuvePlayer = this.getRandomElements(this.state.juvePlayers);
    const randomSalableJuvePlayer = this.getSalablePlayers(this.state.juvePlayers);
    const randomAims = this.getRandomElements(this.state.aims);
    const randomOpponentTeams = this.getRandomElements(this.state.opponentTeams);
    const randomItalianOpponentTeams = this.getItalianTeams(this.state.opponentTeams);
    let replacements = {
      '%AIM%': randomAims[0].name,
      '%AIM2%': randomAims[1].name,
      '%JUVEPLAYER%': randomJuvePlayer[0].name,
      '%SALABLEJUVEPLAYER%': randomSalableJuvePlayer[0].name,
      '%SALABLEJUVEPLAYER2%': randomSalableJuvePlayer[1].name,
      '%BIGNUMBER%': this.randomIntFromInterval(60, 120),
      '%HUGENUMBER%': this.randomIntFromInterval(300, 500),
      '%YEAR%': this.randomYearFromNow(),
      '%OPPONENTTEAM%': randomOpponentTeams[0].name
    };

    this.setState({
      mainTitle: this.createDefinitiveTitle(randomTitle, replacements)
    });

    let randomAimsIndex = 2;
    let randomJuvePlayerIndex = 1;
    let randomOpponentTeamsIndex = 1;
    let randomOtherTitlesIndex = 0;
    let randomItalianOpponentTeamsIndex = 0;

    // Randomly populate all the other available good titles
    const titlesToUse = [];
    const numberOfGoodTitles = 5;
    for (let i = 0; i < numberOfGoodTitles; i++) {
      replacements = {
        '%AIM%': randomAims[randomAimsIndex].name,
        '%AIM_IMAGE%': randomAims[randomAimsIndex].image,
        '%AIM2%': randomAims[randomAimsIndex + 1].name,
        '%AIM2_IMAGE%': randomAims[randomAimsIndex + 1].image,
        '%JUVEPLAYER%': randomJuvePlayer[randomJuvePlayerIndex].name,
        '%JUVEPLAYER_IMAGE%': randomJuvePlayer[randomJuvePlayerIndex].image,
        '%JUVEPLAYER2%': randomJuvePlayer[randomJuvePlayerIndex + 1].name,
        '%JUVEPLAYER2_IMAGE%': randomJuvePlayer[randomJuvePlayerIndex + 1].image,
        '%BIGNUMBER%': this.randomIntFromInterval(44, 60),
        '%HUGENUMBER%': this.randomIntFromInterval(300, 500),
        '%YEAR%': this.randomYearFromNow(),
        '%OPPONENTTEAM%': randomOpponentTeams[randomOpponentTeamsIndex].name,
        '%OPPONENTTEAM_IMAGE%': randomOpponentTeams[randomOpponentTeamsIndex].image,
        '%OPPONENTTEAM2%': randomOpponentTeams[randomOpponentTeamsIndex + 1].name,
        '%OPPONENTTEAM2_IMAGE%': randomOpponentTeams[randomOpponentTeamsIndex + 1].image,
        '%ITALIANOPPONENTTEAM%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].name,
        '%ITALIANOPPONENTTEAM_IMAGE%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].image
      };
      const titleToAdd = {};
      let mdClass = 6;
      let showImage = true;
      if (i >= 2) {
        mdClass = 4;
        showImage = false;
      }
      titleToAdd.mdClass = mdClass;
      titleToAdd.showImage = showImage;
      const randomOtherTitle = randomOtherTitles[randomOtherTitlesIndex];
      titleToAdd.title = this.createDefinitiveTitle(randomOtherTitle.title, replacements);
      const category = randomOtherTitle.category;
      titleToAdd.category = category;
      titleToAdd.categoryColor = this.getColorFromCategory(this.state.categories, category);

      const imageToUse = this.findImage(randomOtherTitle, replacements);
      titleToAdd.imageToUse = imageToUse;

      titlesToUse.push(titleToAdd);
      randomAimsIndex += 2;
      randomJuvePlayerIndex += 2;
      randomOpponentTeamsIndex += 2;
      randomOtherTitlesIndex++;
      randomItalianOpponentTeamsIndex++;
    }

    let randomBadTitlesIndex = 0;

    // Randomly populate all the other available bad titles
    const numberOfBadTitles = 4;
    for (let i = 0; i < numberOfBadTitles; i++) {
      replacements = {
        '%AIM%': randomAims[randomAimsIndex].name,
        '%AIM_IMAGE%': randomAims[randomAimsIndex].image,
        '%AIM2%': randomAims[randomAimsIndex + 1].name,
        '%AIM2_IMAGE%': randomAims[randomAimsIndex + 1].image,
        '%JUVEPLAYER%': randomJuvePlayer[randomJuvePlayerIndex].name,
        '%JUVEPLAYER_IMAGE%': randomJuvePlayer[randomJuvePlayerIndex].image,
        '%JUVEPLAYER2%': randomJuvePlayer[randomJuvePlayerIndex + 1].name,
        '%JUVEPLAYER2_IMAGE%': randomJuvePlayer[randomJuvePlayerIndex + 1].image,
        '%BIGNUMBER%': this.randomIntFromInterval(44, 60),
        '%HUGENUMBER%': this.randomIntFromInterval(300, 500),
        '%YEAR%': this.randomYearFromNow(),
        '%OPPONENTTEAM%': randomOpponentTeams[randomOpponentTeamsIndex].name,
        '%OPPONENTTEAM_IMAGE%': randomOpponentTeams[randomOpponentTeamsIndex].image,
        '%OPPONENTTEAM2%': randomOpponentTeams[randomOpponentTeamsIndex + 1].name,
        '%OPPONENTTEAM2_IMAGE%': randomOpponentTeams[randomOpponentTeamsIndex + 1].image,
        '%ITALIANOPPONENTTEAM%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].name,
        '%ITALIANOPPONENTTEAM_IMAGE%': randomItalianOpponentTeams[randomItalianOpponentTeamsIndex].image
      };
      const titleToAdd = {};
      titleToAdd.mdClass = 3;
      titleToAdd.mini = true;
      const randomOtherTitle = randomBadTitles[randomBadTitlesIndex];
      titleToAdd.title = this.createDefinitiveTitle(randomOtherTitle.title, replacements);
      const category = randomOtherTitle.category;
      titleToAdd.category = category;
      titleToAdd.categoryColor = this.getColorFromCategory(this.state.categories, category);

      const imageToUse = this.findImage(randomOtherTitle, replacements);
      titleToAdd.imageToUse = imageToUse;

      titlesToUse.push(titleToAdd);
      randomAimsIndex += 2;
      randomJuvePlayerIndex += 2;
      randomOpponentTeamsIndex += 2;
      randomBadTitlesIndex++;
      randomItalianOpponentTeamsIndex++;
    }
    this.setState({
      titlesToUse: titlesToUse
    });
  }

  randomIntFromInterval (min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomYearFromNow () {
    const currentYear = new Date().getFullYear();
    return this.randomIntFromInterval(currentYear + 5, currentYear + 10);
  }

  getRandomElements (array) {
    return array.sort(function () {
      return 0.5 - Math.random();
    }); // Shuffle array
  }

  getGoodTitles (array) {
    return this.getRandomElements(array.filter(function (item) {
      return item.isGood;
    }));
  }

  getBadTitles (array) {
    return this.getRandomElements(array.filter(function (item) {
      return !item.isGood;
    }));
  }

  getSalablePlayers (array) {
    return this.getRandomElements(array.filter(function (item) {
      return item.salable;
    }));
  }

  getItalianTeams (array) {
    return this.getRandomElements(array.filter(function (item) {
      return item.isItalian;
    }));
  }

  createDefinitiveTitle (title, replacements) {
    return title.replace(/%\w+%/g, function (all) {
      return replacements[all] || all;
    });
  }

  findImage (title, replacements) {
    const imageToUse = '%' + title.imageToUse + '_IMAGE%';
    return replacements[imageToUse];
  }

  getColorFromCategory (categories, category) {
    return categories.filter(function (item) {
      return item.name === category;
    })[0].color;
  }

  render () {
    const titles = this.state.titlesToUse.map((titleToUse) =>
      <Title
        key={titleToUse.title} mdClass={titleToUse.mdClass} title={titleToUse.title}
        category={titleToUse.category} categoryColor={titleToUse.categoryColor}
        showImage={titleToUse.showImage} imageToUse={titleToUse.imageToUse}
        mini={titleToUse.mini}
      />
    );
    return (
      <div className='container-fluid'>
        <header className='blog-header py-3'>
          <div className='row flex-nowrap justify-content-between align-items-center'>
            <div className='col-4 pt-1'>
              <a className='text-muted' href='https://github.com/DavidePastore/bruttoesporc' rel='noopener noreferrer' target='_blank'>Contribute</a>
            </div>
            <div className='col-4 text-center'>
              <a className='blog-header-logo' id='logo' href='https://github.com/DavidePastore/bruttoesporc' rel='noopener noreferrer' target='_blank'>BRUTTO&SPORC</a>
            </div>
            <div className='col-4 d-flex justify-content-end align-items-center'>
              <a className='text-muted' href='https://github.com/DavidePastore/bruttoesporc' rel='noopener noreferrer' target='_blank'>Contribute</a>
            </div>
          </div>
        </header>
        <MainTitle title={this.state.mainTitle} onRegenerate={this.handleGenerateTitles} />
        <div className='row mb-2 article-titles'>
          {titles}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Newspaper;
