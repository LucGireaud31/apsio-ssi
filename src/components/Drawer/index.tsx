import React, { ReactNode, useEffect, useState } from "react";
import DrawerPkg from "react-native-drawer";
import { sleep } from "../../utils/promise";
import { LoadingPage } from "../LoadingPage";
import { DrawerContent } from "./DrawerContent";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
  onResetPassword(): void;
}

export function Drawer(props: DrawerProps) {
  const { children, isOpen, onClose, onResetPassword } = props;

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    (async () => {
      await sleep(100);
      setDisplay(true);
    })();
  }, []);
  return (
    <DrawerPkg
      type="overlay"
      open={isOpen}
      content={
        <DrawerContent onResetPassword={onResetPassword} onClose={onClose} />
      }
      side="right"
      openDrawerOffset={0.3}
      onCloseStart={onClose}
      tapToClose={true}
      tweenHandler={(ratio) => ({
        mainOverlay: { backgroundColor: `rgba(0, 0, 0, ${0.3 * ratio})` },
      })}
    >
      {display ? children : <LoadingPage />}
    </DrawerPkg>
  );
}
