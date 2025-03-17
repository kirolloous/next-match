"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { singOutUser } from "@/app/actions/authActions";

const UserMenu = ({ user }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className=" transition-transform"
          color="secondary"
          name={user?.name || "use avatar"}
          size="sm"
          src={user?.image || "/images/user.png"}
        />
      </DropdownTrigger>

      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownItem color="danger" onPress={async () => singOutUser()}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
