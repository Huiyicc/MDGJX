import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";

export default observer(() => {
  return (
    <Example>
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={gstore.staticOverlay.deleteItem.open}
        loading={gstore.staticOverlay.deleteItem.loading}
        onCancel={() => {
          gstore.staticOverlay.deleteItem.open = false;
        }}
        onConfirm={() => {
          gstore.staticOverlay.deleteItem.confirm();
        }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: t(
              `Do you want to delete the server <b>{0}</b>? This operation is irreversible.`,
              gstore.staticOverlay.deleteItem.name
            ),
          }}
        ></p>
      </Alert>
    </Example>
  );
});