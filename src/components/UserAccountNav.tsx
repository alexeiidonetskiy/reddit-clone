"use client";
import { User } from "next-auth";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "./ui/DropdownMenu";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
	user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					className="h-8 w-8"
					user={{
						name: user.name || null,
						image: user.image || null,
					}}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-white" align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.name && <p className="font-medium">{user.name}</p>}
						{user.email && (
							<p className="w-[200px] truncate text-sm text-zinc-700">
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link
						href="/"
						className="text-sm leading-6 text-zinc-900"
					>
						Feed
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href="/r/create"
						className="text-sm leading-6 text-zinc-900"
					>
						Create community
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href="/settings"
						className="text-sm leading-6 text-zinc-900"
					>
						Settings
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onSelect={(e) => {
						e.preventDefault();
						signOut({
							callbackUrl: `${window.location.origin}/sign-in`,
						});
					}}
					className="cursor-pointer"
				>
					Sign-out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAccountNav;
