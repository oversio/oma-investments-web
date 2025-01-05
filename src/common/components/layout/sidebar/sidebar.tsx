import { IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionItem,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
} from "@nextui-org/react";
import { Listbox, ListboxItem, ListboxSection, Tooltip } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

import { classMerge } from "../../../utils/class-merge";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: IconDefinition;
  to?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
  items: SidebarItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = React.useState<React.Key>(defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProp,
      base: classMerge(sectionClassesProp?.base, "w-full", {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: classMerge(sectionClassesProp?.group, {
        "flex flex-col gap-1": isCompact,
      }),
      heading: classMerge(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
    };

    const itemClasses = {
      ...itemClassesProp,
      base: classMerge(itemClassesProp?.base, {
        "w-11 h-11 gap-0 p-0": isCompact,
      }),
    };

    const renderNestItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          // Is a nest type item , so we need to remove the href
          delete item.to;
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            classNames={{
              base: classMerge({
                "h-auto p-0": !isCompact && isNestType,
                "inline-block w-11": isCompact && isNestType,
              }),
            }}
            endContent={isCompact || isNestType || hideEndContent ? null : (item.endContent ?? null)}
            startContent={
              isCompact || isNestType ? null : item.icon ? (
                <FontAwesomeIcon
                  className={classMerge(
                    "!text-default-500 group-data-[selected=true]:text-foreground",
                    iconClassName,
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                (item.startContent ?? null)
              )
            }
            title={isCompact || isNestType ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <FontAwesomeIcon
                      className={classMerge(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    (item.startContent ?? null)
                  )}
                </div>
              </Tooltip>
            ) : null}
            {!isCompact && isNestType ? (
              <Accordion className={"p-0"}>
                <AccordionItem
                  key={item.key}
                  aria-label={item.title}
                  classNames={{
                    heading: "pr-3",
                    trigger: "p-0",
                    content: "py-0 pl-4",
                  }}
                  title={
                    item.icon ? (
                      <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                        <FontAwesomeIcon
                          className={classMerge(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                        <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                          {item.title}
                        </span>
                      </div>
                    ) : (
                      (item.startContent ?? null)
                    )
                  }
                >
                  {item.items && item.items?.length > 0 ? (
                    <Listbox
                      className={"mt-0.5"}
                      classNames={{
                        list: classMerge("border-l border-default-200 pl-4"),
                      }}
                      items={item.items}
                      variant="flat"
                    >
                      {item.items.map(renderItem)}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCompact, hideEndContent, iconClassName, items],
    );

    const renderItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item);
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            as={Link}
            endContent={isCompact || hideEndContent ? null : (item.endContent ?? null)}
            startContent={
              isCompact ? null : item.icon ? (
                <FontAwesomeIcon
                  className={classMerge(
                    "text-default-500 group-data-[selected=true]:text-foreground",
                    iconClassName,
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                (item.startContent ?? null)
              )
            }
            textValue={item.title}
            title={isCompact ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <FontAwesomeIcon
                      className={classMerge(
                        "text-default-500 group-data-[selected=true]:text-foreground text-medium",
                        iconClassName,
                      )}
                      icon={item.icon}
                    />
                  ) : (
                    (item.startContent ?? null)
                  )}
                </div>
              </Tooltip>
            ) : null}
          </ListboxItem>
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCompact, hideEndContent, iconClassName, itemClasses?.base],
    );

    return (
      <Listbox
        key={isCompact ? "compact" : "default"}
        ref={ref}
        hideSelectedIcon
        as="nav"
        className={classMerge("list-none", className)}
        classNames={{
          ...classNames,
          list: classMerge("items-center", classNames?.list),
        }}
        color="default"
        itemClasses={{
          ...itemClasses,
          base: classMerge(
            "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
            itemClasses?.base,
          ),
          title: classMerge(
            "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
            itemClasses?.title,
          ),
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onSelectionChange={keys => {
          const key = Array.from(keys)[0];
          setSelected(key as React.Key);
          onSelect?.(key as string);
        }}
        {...props}
      >
        {item => {
          return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              showDivider={isCompact}
              title={item.title}
            >
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  },
);

Sidebar.displayName = "Sidebar";
