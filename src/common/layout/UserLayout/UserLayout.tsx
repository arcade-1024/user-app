import React, { ReactNode } from "react";

export interface UserLayoutInterface {
	children: ReactNode;
}
const UserLayout = ({ children }: UserLayoutInterface) => {
	return (
		<div className="mx-auto w-full px-4 sm:px-6 lg:px-8 lg:py-4">
			<div className="mx-auto max-w-7xl">{children}</div>
		</div>
	);
};

export default UserLayout;
