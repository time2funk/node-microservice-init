const React = require('react');
const PropTypes = require('prop-types');
const Layout = require('./layout');


class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Layout title={this.props.title}>
            <h1>{this.props.title}</h1>
            <p>Welcome to {this.props.title}</p>
        </Layout>
      </div>
    );
  }
}

Index.propTypes = {
  title: PropTypes.string,
};

module.exports = Index;