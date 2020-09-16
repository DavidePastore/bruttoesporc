import React from 'react';
import './Title.css';

class Title extends React.Component {

  render() {
    let image = '';
    if (this.props.showImage) {
      if (this.props.imageToUse) {
        image = <img className="bd-placeholder-img article-image" width="200" height="250" src={this.props.imageToUse}></img>
      } else {
        image = <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      }
    }
    
    let title = <h3 className="mb-0 article-title">{this.props.title}</h3>;
    if (this.props.mini) {
      title = <h6 className="mb-0 article-title">{this.props.title}</h6>;
    }

    let subtitle = null;
    let description = null;
    let topClasses = "row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative";
    let category = null
    if (!this.props.mini) {
      subtitle = <div className="mb-1 text-muted"></div>
      description = <p className="card-text mb-auto"></p>
      topClasses = "row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative";
      category = <strong className="d-inline-block mb-2 article-category" style={{color: this.props.categoryColor}}>{this.props.category}</strong>
    }
    return (
      <div className={'col-md-' + this.props.mdClass}>
        <div className={topClasses}>
          <div className="col p-4 d-flex flex-column position-static">
            {category}
            {title}
            {subtitle}
            {description}
            <a href="#" className="stretched-link"></a>
          </div>
          <div className="col-auto d-none d-lg-block article-image">{image}</div>
        </div>
      </div>
    );
  }
}

export default Title;
