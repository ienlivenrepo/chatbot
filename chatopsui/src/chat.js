import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';
import PropTypes from 'prop-types';

class Message extends Component {
constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

componentWillMount() {
const self = this;
const { steps } = this.props;
const search = {
	message: steps.search.value
};
const endpoint ='http://localhost:5000/chat'
axios.post(endpoint,{ search })
.then(function(response) {
         console.log(response.data);
         self.setState({loading:false,result:response.data});
         self.triggetNext(self.state.result)
      });

}

triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

render() {
    const { trigger, loading, result } = this.state;
    return (
      <div>
        { loading ? <Loading /> : result }
      </div>
    );

  }
}

Message.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Message.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};


const Chat = () => (
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Hello , there !',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <Message />,
        waitAction: true,
        asMessage: true,
        trigger: 'search',
      },
    ]}
  />
);


export default Chat;