import React from "react";
import { connect } from "react-redux";

const GroupScreen = () => {
  return <h1>GroupScreen</h1>;
};

const mapStateToProps = (state: any) => ({
  lessons: state.lessons,
});

const mapDsipatchToProps = null;

export default connect(mapStateToProps, mapDsipatchToProps)(GroupScreen);
