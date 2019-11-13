import * as React from "react";
import { BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import { useHistory } from "react-router";
import AccessibleIcon from "@material-ui/icons/Accessible";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

export const Menu: React.FC = () => {
  const { push, location } = useHistory();
  const handleChange = (_: any, url: string) => {
    push(url);
  };
  return (
    <BottomNavigation value={location.pathname} onChange={handleChange}>
      <BottomNavigationAction
        label="Level 1 old"
        value="/1/old"
        icon={<AccessibleIcon />}
      />
      <BottomNavigationAction
        label="Level 1 new"
        value="/1/new"
        icon={<AccessibleForwardIcon />}
      />
      <BottomNavigationAction
        label="Level 2"
        value="/2"
        icon={<AccessibilityIcon />}
      />
      <BottomNavigationAction
        label="Level 3"
        value="/3"
        icon={<AccessibilityNewIcon />}
      />
    </BottomNavigation>
  );
};
