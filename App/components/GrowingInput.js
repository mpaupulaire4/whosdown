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
  constructor(props) {
    super(props)
    this.state = {
      height: props.minHeight
    }
    this._onChange = this._onChange.bind(this)
  }

  _onChange(event){
    const { onChange, maxHieght, minHeight } = this.props
    const height = event.nativeEvent.contentSize.height

    if (height >= minHeight && height <= maxHieght ){
      this.setState({height})
    }
    onChange(event)
  }

  clear() {
    this.input.clear()
  }
  blur() {
    this.input.blur()
  }

  render() {
    const {style, ...props} = this.props
    return (
      <TextInput ref={(r) => this.input = r } {...props} onChange={this._onChange} style={[style, {height: this.state.height}]} multiline={true}/>
    )
  }
}
