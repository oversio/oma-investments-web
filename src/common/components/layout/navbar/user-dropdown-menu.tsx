import { Avatar } from "@nextui-org/react";

import { useAuthContext } from "../../../../context/context";
import { Dropdown } from "../../dropdown/dropdown";
import { Skeleton } from "../../skeleton/skeleton";

export function UserDropdownMenu() {
  const { logout, userInfo, isAuthenticated } = useAuthContext();
  return (
    <Dropdown
      name="Profile Actions"
      items={[
        {
          key: "profile",
          content: (
            <>
              <p className="font-semibold text-lg">{userInfo?.fullName}</p>
              <p className="text-sm text-gray-400">{userInfo?.email}</p>
            </>
          ),
          className: "flex flex-col",
          showDivider: true,
        },
        // eslint-disable-next-line no-console
        { key: "settings", content: "My Settings", onClick: console.log },
        { key: "logout", content: "Log Out", color: "danger", onClick: logout },
      ]}
    >
      {isAuthenticated === null ? (
        <Skeleton className="rounded-full size-10" />
      ) : (
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={userInfo?.fullName}
          size="sm"
          src={userInfo?.picture ?? ""}
        />
      )}
    </Dropdown>
  );
}
