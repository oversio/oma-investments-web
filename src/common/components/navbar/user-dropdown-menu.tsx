import { Avatar } from "@nextui-org/react";

import { useAuthContext } from "../../../context/context";
import { Dropdown } from "../dropdown/dropdown";

export function UserDropdownMenu() {
  const { logout } = useAuthContext();
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
          // eslint-disable-next-line no-console
          onClick: console.log,
          className: "flex flex-col",
          showDivider: true,
        },
        // eslint-disable-next-line no-console
        { key: "settings", content: "My Settings", onClick: console.log },
        { key: "logout", content: "Log Out", color: "danger", onClick: logout },
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
