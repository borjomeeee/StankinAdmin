import React from "react";
import { connect } from "react-redux";

import "./Main.screen.scss";

import MainFilterBar from "../components/MainFilterBar.component";
import MainGroupComponent from "../components/MainGroup.component";
import EditRemoveHOC from "../HOCs/EditRemove.HOC";

type IGroup = {
  id: number;
  title: string;
};

const groups: IGroup[] = [
  {
    id: 1,
    title: "ИДБ-18-07",
  },
  {
    id: 2,
    title: "ИДБ-18-06",
  },
  {
    id: 3,
    title: "ИДБ-18-05",
  },
];

const MainScreen = () => {
  const MainGroups = () => (
    <>
      {groups.map(({ id, title }: IGroup) => (
        <EditRemoveHOC
          onEdit={() => console.log(`Edit group: ${id}`)}
          onRemove={() => console.log(`Remove group: ${id}`)}
        >
          <MainGroupComponent
            props={{ onClick: () => console.log(`Touched group: ${id}`) }}
            title={title}
          />
        </EditRemoveHOC>
      ))}
    </>
  );
  return (
    <div className="main">
      <div className="filters">
        <MainFilterBar />
      </div>

      <div className="content main__content">
        <div className="main__groups">
          <MainGroups />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  groups: state.groups,
});

const mapDsipatchToProps = null;

export default connect(mapStateToProps, mapDsipatchToProps)(MainScreen);
