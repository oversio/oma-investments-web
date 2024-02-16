import { Avatar } from "@nextui-org/react";
import { Dropdown } from "../dropdown/dropdown";

export function UserDropdownMenu() {
  return (
    <Dropdown
      name="Profile Actions"
      items={[
        {
          key: "profile",
          content: (
            <>
              <p className="font-semibold text-lg">Over Martinez</p>
              <p className="text-sm text-gray-400">over.martinez@omasolutions.cl</p>
            </>
          ),
          onClick: console.log,
          className: "flex flex-col",
          showDivider: true,
        },
        { key: "settings", content: "My Settings", onClick: console.log },
        { key: "logout", content: "Log Out", color: "danger", onClick: console.log },
      ]}
    >
      <Avatar
        isBordered
        as="button"
        className="transition-transform"
        color="secondary"
        name="Jason Hughes"
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    </Dropdown>
  );
}
