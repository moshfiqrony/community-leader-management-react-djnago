import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.IsVisible,
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.IsVisible,
    })
  }


  handleOk = (e) => {
    e.preventDefault();
    alert('You Submitted '+e.target.elements.name.value)
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleChange(e){
    const{name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App