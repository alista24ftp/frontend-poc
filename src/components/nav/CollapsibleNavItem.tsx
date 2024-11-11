"use client";

import { useState } from "react";
import { Collapse, ListItemButton, ListItemText } from "@mui/material";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import styles from "@/components/nav/CollapsibleNavItem.module.scss";

export const CollapsibleNavItem = ({
  navItemText,
  initialOpen,
  children,
}: {
  navItemText: string;
  initialOpen: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);

  const handleToggle = () => setOpen(!open);

  const navItemClassName = `${initialOpen ? styles.navToggleActiveButton : ""}`;

  return (
    <>
      <ListItemButton className={navItemClassName} onClick={handleToggle}>
        <ListItemText primary={navItemText} />
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
