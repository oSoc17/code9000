const mapActionCreatorsToProps = (actionCreators) => (dispatch) => {
  const actionCreatorKeys = Object.keys(actionCreators);

  return actionCreatorKeys.reduce((acc, key) => {
    acc[key] = (...args) => dispatch(actionCreators[key](...args));

    return acc;
  }, {});
};

export default mapActionCreatorsToProps;
