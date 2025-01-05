import { faCircleChevronLeft, faCircleChevronRight, faPowerOff } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spacer, Tooltip } from "@nextui-org/react";
import { Outlet } from "react-router";

import { appConfig } from "../../../app/app-config";
import { classMerge } from "../../utils/class-merge";
import { AcmeIcon } from "./acme";
import { useLayoutContext } from "./context/layout-context";
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { SidebarDrawer } from "./sidebar/sidebar-drawer";
import { items } from "./sidebar/sidebar-menu-item";

export function Layout() {
  const { isOpen, onOpenChange, isCollapsed, isMobile, onToggle } = useLayoutContext();

  return (
    <div className="flex h-dvh w-full gap-4">
      <SidebarDrawer
        className={classMerge("min-w-[288px] rounded-lg", { "min-w-[76px]": isCollapsed })}
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <div
          className={classMerge(
            "will-change relative flex h-full w-72 flex-col bg-default-100 p-6 transition-width",
            {
              "w-[83px] items-center px-[6px] py-6": isCollapsed,
            },
          )}
        >
          <div
            className={classMerge("flex items-center gap-3 pl-2", {
              "justify-center gap-0 pl-0": isCollapsed,
            })}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
              <AcmeIcon className="text-background" />
            </div>
            <span
              className={classMerge("w-full text-small font-bold uppercase opacity-100", {
                "w-0 opacity-0": isCollapsed,
              })}
            >
              {appConfig.name}
            </span>
            <div className={classMerge("flex-end flex", { hidden: isCollapsed })}>
              <Button
                isIconOnly
                className="flex h-10 w-10 text-default-600"
                size="sm"
                variant="light"
                onPress={isMobile ? onOpenChange : onToggle}
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-medium dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                  icon={faCircleChevronLeft}
                />
              </Button>
            </div>
          </div>

          <Spacer y={6} />

          <Sidebar
            defaultSelectedKey="dashboard"
            iconClassName="group-data-[selected=true]:text-default-50"
            isCompact={isCollapsed}
            itemClasses={{
              base: "px-3 rounded-large data-[selected=true]:!bg-foreground",
              title: "group-data-[selected=true]:text-default-50",
            }}
            items={items}
          />

          <Spacer y={8} />

          <div
            className={classMerge("mt-auto flex flex-col", {
              "items-center": isCollapsed,
            })}
          >
            {isCollapsed && (
              <Tooltip content="Open sidebar" placement="right">
                <Button
                  isIconOnly
                  className="flex h-10 w-10 text-default-600"
                  size="sm"
                  variant="light"
                  onPress={onToggle}
                >
                  <FontAwesomeIcon
                    className="cursor-pointer text-medium dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                    icon={faCircleChevronRight}
                  />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="Log Out" isDisabled={!isCollapsed} placement="right">
              <Button
                className={classMerge("justify-start text-default-500 data-[hover=true]:text-foreground", {
                  "justify-center": isCollapsed,
                })}
                isIconOnly={isCollapsed}
                startContent={
                  isCollapsed ? null : (
                    <FontAwesomeIcon className="flex-none text-default-500 text-medium" icon={faPowerOff} />
                  )
                }
                variant="light"
              >
                {isCollapsed ? (
                  <FontAwesomeIcon className="text-default-500 text-medium" icon={faPowerOff} />
                ) : (
                  "Log Out"
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </SidebarDrawer>

      {/* Content */}
      <div className="w-full flex-1 px-4 py-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
