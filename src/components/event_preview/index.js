import React, {Component} from 'react';
import { Text } from 'react-native';

class eventPreview extends Component {
  constructor(props) {
    super(props);
    console.log('eventPreview got this!', props);
  }

  render() {
    return (<Text>{this.props.title}</Text>
    );
  }
}

export default eventPreview;
