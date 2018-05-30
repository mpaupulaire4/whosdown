import React, { Component } from 'react'
import {
  TextInput,
} from 'react-native'

export default class GrowingInput extends Component {
  static defaultProps = {
    maxHieght: 90,
    minHeight: 30,
    onChange: () => {}
  }

  state = {
    height: this.props.minHeight
  }

  _onChange = (event) => {
    const { maxHieght, minHeight } = this.props
    const height = event.nativeEvent.contentSize.height

    if (height >= minHeight && height <= maxHieght ){
      this.setState({height})
    }
  }

  render() {
    const {style, ...props} = this.props
    return (
      <TextInput
        {...props}
        onContentSizeChange={this._onChange}
        style={[style, {height: this.state.height}]}
        multiline={true}
      />
    )
  }
}
