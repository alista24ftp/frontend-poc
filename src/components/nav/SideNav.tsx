"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, ListItem, ListSubheader } from "@mui/material";

import styles from "@/components/nav/SideNav.module.scss";
import { PATHS } from "@/constants/paths";
import { CollapsibleNavItem } from "@/components/nav/CollapsibleNavItem";

export const SideNav = () => {
  const currPath = usePathname();

  const isNavItemActive = (path: string) => {
    return path === currPath;
  };

  const isCollapsibleNavItemActive = (path: string) => {
    return currPath.startsWith(path);
  };

  const navItemClassName = (path: string) =>
    `${isNavItemActive(path) ? styles.sideNavActiveItem : ""}`;

  const innerNavItemClassName = (path: string) =>
    `${styles.sideNavInnerItem} ${
      isNavItemActive(path) ? styles.sideNavActiveInnerItem : ""
    }`;

  return (
    <List
      className={styles.sideNav}
      component="nav"
      aria-labelledby="side-nav-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="side-nav-subheader"
          className={styles.sideNavHeader}
        >
          Concepts
        </ListSubheader>
      }
    >
      <ListItem className={navItemClassName(PATHS.HOME)} component="div">
        <Link href={PATHS.HOME} className="nav-link">
          Home
        </Link>
      </ListItem>

      <CollapsibleNavItem
        navItemText="react-hook-form"
        initialOpen={isCollapsibleNavItemActive(PATHS.REACT_HOOK_FORM.HOME)}
      >
        <List component="div" disablePadding>
          <ListItem
            className={innerNavItemClassName(PATHS.REACT_HOOK_FORM.HOME)}
            component="div"
          >
            <Link href={PATHS.REACT_HOOK_FORM.HOME} className="nav-link">
              Home
            </Link>
          </ListItem>

          <ListItem
            className={innerNavItemClassName(
              PATHS.REACT_HOOK_FORM.ASYNC_VALIDATION
            )}
            component="div"
          >
            <Link
              href={PATHS.REACT_HOOK_FORM.ASYNC_VALIDATION}
              className="nav-link"
            >
              Async Validation
            </Link>
          </ListItem>

          <ListItem
            className={innerNavItemClassName(
              PATHS.REACT_HOOK_FORM.VALIDATE_WITH_MODAL
            )}
            component="div"
          >
            <Link
              href={PATHS.REACT_HOOK_FORM.VALIDATE_WITH_MODAL}
              className="nav-link"
            >
              Validate with Modal
            </Link>
          </ListItem>
        </List>
      </CollapsibleNavItem>
    </List>
  );
};
